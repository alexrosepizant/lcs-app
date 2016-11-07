"use strict"

// Articles routes use suggestions controller
const votes = require("../controllers/votes")
const authorization = require("./middlewares/authorization")

module.exports = function(app) {

  // CRUD endPoints
  app.get("/votes", votes.all)
  app.post("/votes", authorization.requiresLogin, votes.create)
  app.get("/votes/:suggestionId", votes.show)
  app.put("/votes/:suggestionId", authorization.requiresLogin, votes.update)
  app.delete("/votes/:suggestionId", authorization.requiresLogin, votes.destroy)

	// Finish with setting up the suggestionId param
  app.param("suggestionId", votes.suggestion)
}
