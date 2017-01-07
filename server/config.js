"use strict"

const path = require("path")

module.exports = {
  app: {
    name: "lcs-app",
  },
  db: "mongodb://localhost/mean-dev",
  root: path.normalize(__dirname + "/../"),
  port: (process.env.NODE_ENV === "production") ? 80 : 3000,
  sessionSecret: "MEAN",
  sessionCollection: "sessions",
  requestMaxSize: "5mb",
  appDirectory: "/../src/",
  buildDirectory: "/../dist/",
  publicDirectory:  "/public/",
  faviconPath: "assets/images/favicon.ico",
  uploadDirectory:  "tmp/",
  imgDirectory:  "img/",
  userImgDirectory: "public/img/users/",
  userVideoDirectory: "video/",
  cacheDirectoryX300: "public/.cache/crop/300/img/users/",
  cacheDirectoryX100: "public/.cache/crop/100x100/img/users/",
}
