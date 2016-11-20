"use strict"

// Articles routes use suggestions controller
const parameters = require("../controllers/parameters")
const authorization = require("./middlewares/authorization")

module.exports = (app) => {
  app.get("/parameters", parameters.getAllParameters)
  app.put("/parameters", authorization.requiresLogin, parameters.update)
}
