"use strict"

const files = require("../controllers/files")

module.exports = (app) => {
  /** Upload photos and videos**/
  app.post("/upload/photo", files.handlePhotoUpload)
  app.post("/upload/video", files.handleVideoUpload)

  /** Download photos **/
  app.post("/download/:id", files.download)
  app.get("/file/:id", files.getZipFile)
}
