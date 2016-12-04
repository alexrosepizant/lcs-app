"use strict"

const path = require("path")

module.exports = {
  app: {
    name: "lcs-app",
  },
  db: "mongodb://localhost/mean-dev",
  root: path.normalize(__dirname + "/../"),
  port: process.env.PORT || 80,
  sessionSecret: "MEAN",
  sessionCollection: "sessions",
  requestMaxSize: "5mb",
  publicDirectory:  "/public/",
  uploadDirectory:  "tmp/",
  imgDirectory:  "img/",
  userImgDirectory: "public/img/users/",
  userVideoDirectory: "video/",
  cacheDirectoryX300: "public/.cache/crop/300/img/users/",
  cacheDirectoryX100: "public/.cache/crop/100x100/img/users/",
}
