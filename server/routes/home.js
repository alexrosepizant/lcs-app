"use strict"

// Articles routes use suggestions controller
const home = require("../controllers/home")

module.exports = (app) => {
  app.get("/home", home.getAllUserData)
}
