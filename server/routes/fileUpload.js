"use strict"

const files = require("../controllers/files")

module.exports = (app) => {
  app.post("/upload/photo", files.handlePhotoUpload)
  app.post("/upload/video", files.handleVideoUpload)
}
