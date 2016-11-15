const path= require("path")
const fs = require("fs")
const express = require("express")
const httpProxy = require("http-proxy")
const passport = require("passport")
const mongoose = require("mongoose")
const config = require("./config")

const proxy = httpProxy.createProxyServer()
const isProduction = process.env.NODE_ENV === "production"
const host = process.env.APP_HOST || "localhost"
const port = isProduction ? 80 : 3000

const routesPath = __dirname + "/routes"
const modelsPath = __dirname + "/models"
const publicPath = path.join(__dirname, "/../src/")

const walk = function(path, app, withPasseport) {
  fs.readdirSync(path).forEach(function(file) {
    const newPath = path + "/" + file
    const stat = fs.statSync(newPath)
    if (stat.isFile()) {
      if (/(.*)\.(js$)/.test(file) && withPasseport) {
        require(newPath)(app, passport)
      }
      if (/(.*)\.(js$)/.test(file)) {
        require(newPath)
      }
    } else if (stat.isDirectory() && file !== "middlewares") {
      walk(newPath)
    }
  })
}

// Bootstrap models
walk(modelsPath)

// Bootstrap passport config
require("./passport")(passport)

// Create express instance
const app = express()

require("./express")(app, passport)

// Bootstrap routes
walk(routesPath, app, true)

// Webpack dev server
if (!isProduction) {
  app.all(["/dist/*", "*.hot-update.json"], function(req, res) {
    proxy.web(req, res, {
      target: "http://" + host + ":3001",
    })
  })

  proxy.on("error", function() {
    console.log("Could not connect to proxy, please try again...")
  })
}

// Define route for app
app.get("/", function(req, res) {
  if (req.user) {
    res.cookie("user", JSON.stringify(req.user.user_info))
  }

  res.sendFile(path.join(publicPath, "index.html"))
})

// Connect to MongoDB and start server
mongoose.Promise = global.Promise
mongoose.connect(config.db, {
  server:{
    auto_reconnect:true,
  },
}, function(err) {
  if (err) {
    console.error("Could not connect to MongoDB! " + err)
  }  else {
    app.listen(port, function() {
      console.log("Express app started on port " + port)
    })
  }
})

// Start cron: need to import after mongoose models
const cronjob = require("../scripts/cron.js") // eslint-disable-line

cronjob.startCron()