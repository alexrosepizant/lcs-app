"use strict"

// Articles routes use suggestions controller
const home = require("../controllers/home")

module.exports = function(app) {
  app.get("/home", home.getAllUserData)
}
