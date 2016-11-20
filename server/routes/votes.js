"use strict"

// Articles routes use suggestions controller
const votes = require("../controllers/votes")
const authorization = require("./middlewares/authorization")

module.exports = (app) => {

  // CRUD endPoints
  app.get("/votes", votes.all)
  app.post("/votes", authorization.requiresLogin, votes.create)
  app.get("/votes/:voteId", votes.show)
  app.put("/votes/:voteId", authorization.requiresLogin, votes.update)
  app.delete("/votes/:voteId", authorization.requiresLogin, votes.destroy)

	// Finish with setting up the voteId param
  app.param("voteId", votes.vote)
}
