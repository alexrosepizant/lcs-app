const express = require("express")
const session = require("express-session")
const favicon = require("serve-favicon")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const multer = require("multer")
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const serveStatic = require("serve-static")
const	qt = require("quickthumb")
const MongoStore = require("connect-mongo")(session)
const	config = require("./config")

const router = express.Router()
const appDirectory = __dirname + "/../src/"
const assetDirectory = appDirectory + "assets/"
const faviconPath = assetDirectory + "/images/favicon.ico"

module.exports = (app, passport) => {
  app.set("showStackError", true)

	// Only use logger for development environment
  if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"))
  }

  // Define view engine to html with ejs
  app.set("view engine", "ejs")
  app.engine(".html", require("ejs").renderFile)

  // Express utilities: cookies, bodyParser, uploadDirectory
  app.use(cookieParser())
  app.use(bodyParser.json({
    limit: config.requestMaxSize,
  }))
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: config.requestMaxSize,
  }))
  app.use(multer({
    dest: __dirname + config.publicDirectory + config.uploadDirectory,
  }))
  app.use(methodOverride())

  // Assets rendering: app/users_ressources/favicon
  app.use(serveStatic(appDirectory))
  app.use(serveStatic(__dirname + config.publicDirectory))
  app.use(config.publicDirectory + config.imgDirectory,
    qt.static(__dirname + config.publicDirectory + config.imgDirectory))
  app.use(favicon(faviconPath))

	// Express/Mongo session storage
  app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: config.db,
      collection: "sessions",
    }),
  }))

	// Use passport session
  app.use(passport.initialize())
  app.use(passport.session())

	// 500 error page
  router.use((err, req, res, next) => {
    if (~err.message.indexOf("not found")) return next()
    console.error(err.stack)
    res.status(500).render("500", {
      error: err.stack,
    })
  })

	// Assume 404 since no middleware responded
  router.use((req, res) => {
    res.status(404).render("404", {
      url: req.originalUrl,
      error: "Not found",
    })
  })
}
