const fs = require("fs")
const express = require("express")
const passport = require("passport")
const localExpress = require("./express")

const routesPath = __dirname + "/routes"
const modelsPath = __dirname + "/models"

exports.titleLog = (value) => {
  console.log("")
  console.log("-------------------------")
  console.log(value)
  console.log("-------------------------")
  console.log("")
}

const bootstrapFiles = (path, app, withPasseport) => {
  fs.readdirSync(path).forEach((file) => {
    const newPath = path + "/" + file
    const stat = fs.statSync(newPath)
    if (stat.isFile() && file !== "socket.js") {
      if (/(.*)\.(js$)/.test(file) && withPasseport) {
        require(newPath)(app, passport)
      }
      if (/(.*)\.(js$)/.test(file)) {
        require(newPath)
      }
    } else if (stat.isDirectory() && file !== "middlewares") {
      bootstrapFiles(newPath)
    }
  })
}

exports.bootstrapApp = () => {
  // Bootstrap models
  bootstrapFiles(modelsPath)
  // Bootstrap passport config
  require("./passport")(passport)
  // Create express instance
  const app = express()
  localExpress(app, passport)
  // Bootstrap routes
  bootstrapFiles(routesPath, app, true)
  return app
}
