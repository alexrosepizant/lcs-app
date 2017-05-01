"use strict"

// Articles routes use suggestions controller
const parameters = require("../controllers/parameter")
const authorization = require("./middlewares/authorization")

module.exports = (app) => {
  app.get("/parameter", parameters.getAllParameters)
  app.put("/parameter", authorization.requiresLogin, parameters.update)
}
