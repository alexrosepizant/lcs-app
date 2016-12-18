"use strict"

// UserEvent routes use idea controller
const _ = require("lodash")
const ideas = require("../controllers/idea")
const authorization = require("./middlewares/authorization")

module.exports = (app) => {

  // Setting up the ideaId param
  app.param("ideaId", (req, res, next) => {
    ideas.idea(req.params.ideaId)
      .then((idea, err) => {
        if (err) return next(err)
        req.idea = idea
        next()
      })
  })

  /**
  CRUD endPoints
  **/

  // CREATE: POST /idea
  app.post("/idea", authorization.requiresLogin, (req, res) => {
    ideas.create(Object.assign(req.body, {
      user: req.user,
    })).then((idea) => {
      res.jsonp(idea)
    }).catch((err) => {
      res.status(400).json(err)
    })
  })

  // READ ALL: GET idea
  app.get("/idea", (req, res) => {
    ideas.all(req.params)
      .then((ideas) => {
        res.jsonp(ideas)
      }).catch((err) => {
        res.status(400).json(err)
      })
  })

  // READ ONE: GET idea/ideaId
  app.get("/idea/:ideaId", (req, res) => {
    ideas.idea(req.params.ideaId)
      .then((idea) => {
        res.jsonp(idea)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })

  // UPDATE: PUT idea/ideaId
  app.put("/idea/:ideaId", (req, res) => {
    const idea = _.extend(req.idea, req.body)
    ideas.update(idea)
      .then((idea) => {
        res.jsonp(idea)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })

  // DELETE: DELETE idea/ideaId
  app.delete("/idea/:ideaId", (req, res) => {
    ideas.destroy(req.idea)
      .then((idea) => {
        res.jsonp(idea)
      }).catch((err) => {
        res.status(400).json(err)
      })
  })
}
