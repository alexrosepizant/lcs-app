"use strict"

const files = require("../controllers/files")

module.exports = function(app) {
  app.post("/upload/photo", files.uploadPhoto)
  app.post("/upload/video", files.uploadVideo)
}
