"use strict"

const fs = require("fs")
const path = require("path")
const gm = require("gm").subClass({imageMagick: true})
const mongoose = require("mongoose")
const archiver = require("archiver")
const config = require("../config")

const Article = mongoose.model("Article")

/**
Utils functions
**/
const guid = (() => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  return () => {
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4()
  }
})()

const uploadSuccess = (res, location, originalName) => {
  res.jsonp({
    err: null,
    location: location,
    name: originalName,
  })
}

const uploadFailure = (res, err) => {
  res.status(400).json({
    err: err,
    location: null,
  })
}

const isInvalidImage = (image) => {
  return (image
    && image.mimetype !== "image/png"
    && image.mimetype !== "image/jpeg"
    && image.mimetype !== "image/gif")
}

exports.rotateImage = () => {
  const oldPath = path.resolve(config.root + "/server/public/img/users/")
  fs.readdir(oldPath, (err, items) => {
    if (items) {
      _.each(items, (item) => {
        const name = item
        const newPath = path.resolve(config.root + "/server/public/img/tmp/" + name)
        gm(path.resolve(config.root + "/server/public/img/users/" + name))
          .autoOrient()
          .write(newPath, (err) => {
            if (err) {
              console.log("Error when trying to move new image " + err)
            } else {
              console.log("Rotate image ")
            }
          })
      })
      console.warn("End process of image traitment!")
    }
  })
}

exports.rename = (from, to) => {
  return new Promise((resolve, reject) => {
    fs.rename(from, to, (err, res) => {
      if (err) reject(err)
      else resolve(res)
    })
  })
}

  // Manage photo upload with gm
exports.handlePhotoUpload = (req, res) => {
  const params = req.files

  if (isInvalidImage(params.file)) {
    return uploadFailure(res, "Wrong file type")
  }

  const oldImage = params.file || params.image
  const oldName = oldImage.name || oldImage.name
  const newName = guid() + "." + oldImage.path.split(".").pop()
  const newPath = path.resolve(config.root + "/server/" + config.userImgDirectory + newName)

  gm(oldImage.path)
    .gravity("Center")
    .quality(0.7)
    .autoOrient()
    .write(newPath, (err) => {
      if (err) {
        uploadFailure(res, err)
      } else {
        // Remove origin file in all case
        fs.unlink(oldImage.path, (err) => {
          if (err) {
            uploadFailure(res, err)
          } else {
            uploadSuccess(res, config.userImgDirectory + newName, oldName)
          }
        })
      }
    })
}

exports.handleVideoUpload = (req, res) => {
  res.jsonp({
    err: null,
    location: config.uploadDirectory + req.files.file.path.split("/").pop(),
    mimeType: req.files.file.mimetype,
  })
}

exports.download = (req, res) => {

  const src = []
  const id = req.params.id
  const output = fs.createWriteStream(path.resolve(config.root + "/server/public/tmp/" + id + ".zip"))
  const archive = archiver("zip")

  Article.findOne({
    _id: id,
  }).exec((err, album) => {
    if (err) console.log("error: " + err)

    archive.pipe(output)

		// add each photo of the album to the archive
    album.photoList.forEach((entry) => {
      src.push(entry.filepath.split("public/img/users/").pop())
    })

    archive.bulk([{
      cwd: path.resolve(config.root + "/server/public/img/users/"),
      src: src,
      dest: album.name,
      expand: true,
    }])

    archive.on("end", () => {
      return res.json({
        success: true,
      })
    })

    archive.finalize()
  })
}

exports.getZipFile = (req, res) => {

  let error = false // Set a flag to check for errors in downloading the file
  const filePath = path.resolve(config.root + "/server/public/tmp/" + req.params.id + ".zip")

  const stream = fs.createReadStream(filePath, {
    bufferSize: 64 * 1024,
  })

  stream.pipe(res)
  stream.on("error", () => {
    error = true
  })

  stream.on("close", () => {
    if (!error)	{
      fs.unlink(filePath) // Delete the archive
    }
  })
}
