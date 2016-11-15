"use strict"

const path = require("path")

module.exports = {
  db: "mongodb://localhost/mean-dev",
  app: {
    name: "lcs-app",
  },
  root: path.normalize(__dirname + "/../"),
  port: process.env.PORT || 80,
  sessionSecret: "MEAN",
  sessionCollection: "sessions",
  uploadDirectory: __dirname + "/public/.tmp/",
  userImgDirectory: "public/img/users/",
  userVideoDirectory: "public/video/",
  cacheDirectoryX300: "public/.cache/crop/300/img/users/",
  cacheDirectoryX100: "public/.cache/crop/100x100/img/users/",
}