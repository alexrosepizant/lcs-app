"use strict"

const path = require("path")
const fs = require("fs")
const mongoose = require("mongoose")
const _ = require("lodash")
const archiver = require("archiver")
const config = require("../config")

const Album = mongoose.model("Album")

exports.album = (req, res, next) => {
  Album.findOne({_id: req.params.id})
		.populate("comments.user", "_id name username avatar")
		.populate("comments.replies.user", "_id name username avatar")
		.populate("user")
    .exec((err, album) => {
      if (err) {
        return next(err)
      }

      req.album = album
      next()
    })
}

exports.findAllAlbums = (req, res) => {
  const perPage = req.query.perPage
  const page = req.query.page
  const query = (req.query.userId) ? {
    user: req.query.userId,
  } : {}

  Album.find(query)
		.sort("-created")
		.populate("user", "_id name username avatar")
		.limit(perPage)
		.skip(perPage * page)
    .exec((err, albums) => {
      res.send(albums)
    })
}

exports.findAlbumById = (req, res) => {
  Album.findOne({_id: req.params.id})
		.populate("comments.user", "_id name username avatar")
		.populate("comments.replies.user", "_id name username avatar")
		.populate("user")
    .exec((err, album) => {
      if (err) console.log("error finding album: " + err)
      res.send(album)
    })
}

exports.addAlbum = (req, res) => {

  const newAlbum = req.body
  newAlbum.user = req.user

  Album.create(newAlbum, (err, album) => {
    if (err) {
      console.log("error: " + err)
    }
    res.send(album)
  })
}

exports.updateAlbum = (req, res) => {
  let album = req.album
  album = _.extend(album, req.body)
  album.save((err, album, numAffected) => {
    if (err) console.log("Error saving album: " + err)
    console.log(numAffected + " documents updated.")
    res.send(album)
  })
}

exports.deleteAlbum = (req, res) => {
  Album.findById(req.params.id, (err, doc) => {
    if (!err) {

      const files = _.extend({}, doc.photoList)
      doc.remove(() => {

        res.send(req.body)

				// remove files on filesystem
        _.each(files, (file) => {
          if (file.filepath) {

            const filename = file.filepath.split(config.uploadDirectory).pop()
            fs.unlink(path.resolve(config.root + "/server/" + config.uploadDirectory + filename))
            fs.unlink(path.resolve(config.root + "/server/" + config.cacheDirectoryX300 + filename))
            fs.unlink(path.resolve(config.root + "/server/" + config.cacheDirectoryX100 + filename))
          }
        })
      })

    } else {
      console.log("error: " + err)
    }
  })
}

exports.download = (req, res) => {

  const src = []
  const id = req.params.id
  const output = fs.createWriteStream(path.resolve(config.root + "/server/public/temp_files/" + id + ".zip"))
  const archive = archiver("zip")

  Album.findOne({
    _id: id,
  }).exec((err, album) => {
    if (err) console.log("error: " + err)

    archive.pipe(output)

		// add each photo of the album to the archive
    _.each(album.photoList, (entry) => {
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
  const filePath = path.resolve(config.root + "/server/public/temp_files/" + req.params.id + ".zip")

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
