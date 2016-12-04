"use strict"

const fs = require("fs")
const path = require("path")
const gm = require("gm").subClass({imageMagick: true})
const config = require("../config")

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
