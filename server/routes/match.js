"use strict"

// Articles routes use articles controller
const _ = require("lodash")
const matchs = require("../controllers/match")
const authorization = require("./middlewares/authorization")

module.exports = (app) => {

  // Setting up the matchId param
  app.param("matchId", (req, res, next) => {
    matchs.match(req.params.matchId)
      .then((match, err) => {
        if (err) return next(err)
        req.match = match
        next()
      })
  })

  /**
  CRUD endPoints
  **/

  // CREATE: POST /matchs
  app.post("/match", authorization.requiresLogin, (req, res) => {
    matchs.create(req.body).then((match) => {
      res.jsonp(match)
    }).catch((err) => {
      res.status(400).json(err)
    })
  })

  // READ ALL: GET match
  app.get("/match", (req, res) => {
    matchs.all(req.query)
      .then((matchs) => {
        res.jsonp(matchs)
      }).catch((err) => {
        res.status(400).json(err)
      })
  })

  // READ ONE: GET match/matchId
  app.get("/match/:matchId", (req, res) => {
    matchs.match(req.params.matchId)
      .then((match) => {
        res.jsonp(match)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })

  // UPDATE: PUT match/matchId
  app.put("/match/:matchId", (req, res) => {
    const match = _.extend(req.match, req.body)
    matchs.update(match)
      .then((match) => {
        res.jsonp(match)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })

  // DELETE: DELETE match/matchId
  app.delete("/match/:matchId", (req, res) => {
    matchs.destroy(req.match)
      .then((match) => {
        res.jsonp(match)
      }).catch((err) => {
        res.status(400).json(err)
      })
  })
}
