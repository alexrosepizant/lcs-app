"use strict"

// Articles routes use articles controller
const comments = require("../controllers/comments")
const authorization = require("./middlewares/authorization")

module.exports = function(app) {

  // CRUD enPoints
  app.get("/comments/:id", comments.findCommentById)
  app.get("/comments", comments.findAllComments)
  app.post("/comments", authorization.requiresLogin, comments.addComment)
  app.put("/comments/:id", comments.updateComment)

	// comments count
  app.get("/commentsCount", comments.getItemsCount)

	// Finish with setting up the commentId param
  app.param("id", comments.comment)
}
