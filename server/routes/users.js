"use strict"

// User routes use users controller
const users = require("../controllers/users")
const session = require("../controllers/session")
const authorization = require("./middlewares/authorization")

module.exports = function(app) {

  // Login and signup
  app.get("/auth/check_username/:username", users.exists)
  app.get("/auth/session", authorization.requiresLogin, session.session)
  app.post("/auth/session", session.login)
  app.post("/auth/users", users.create)
  app.delete("/auth/session", session.logout)

  // CRUD endPoints
  app.get("/users", users.team)
  app.get("/users/me", users.me)
  app.put("/users/:userId", users.update)
  app.get("/users/:userId", users.findOne)

	// Setting up the userId param
  app.param("userId", users.user)
}
