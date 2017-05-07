"use strict"

// Articles routes use suggestions controller
const _ = require("lodash")
const votes = require("../controllers/vote")
const mail = require("../controllers/mail")
const notifications = require("../controllers/notification")
const authorization = require("./middlewares/authorization")

module.exports = (app) => {

  // Setting up the voteId param
  app.param("voteId", (req, res, next) => {
    votes.vote(req.params.voteId)
      .then((vote, err) => {
        if (err) return next(err)
        req.vote = vote
        next()
      })
  })

  /**
  CRUD endPoints
  **/

  // CREATE: POST /vote
  app.post("/vote", authorization.requiresLogin, (req, res) => {
    votes.create(Object.assign(req.body, {
      user: req.user,
    })).then((vote) => {

      // create notification
      notifications.create({
        title: vote.title || "Nouveau vote",
        contentId: vote._id,
        type: "vote",
        user: vote.user,
      })

      // send mail
      mail.sendToAll("voteMail", {
        subject : vote.user.username + " a ajouté un nouveau vote, " + vote.title,
        html : "Viens donner ton avis pour <b>" + vote.title
          + "</b> en exclusivité sur les coqs soccer. "
          + "<b><a href='http://lescoqssoccer.fr/#/vote/" + vote._id + "'><br/><br/>"
          + "C'est par ici :)</a></b>",
      })

      res.jsonp(vote)
    }).catch((err) => {
      res.status(400).json(err)
    })
  })

  // READ ALL: GET vote
  app.get("/vote", (req, res) => {
    votes.all(req.params)
      .then((votes) => {
        res.jsonp(votes)
      }).catch((err) => {
        res.status(400).json(err)
      })
  })

  // READ ONE: GET vote/voteId
  app.get("/vote/:voteId", (req, res) => {
    votes.vote(req.params.voteId)
      .then((vote) => {
        res.jsonp(vote)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })

  // UPDATE: PUT vote/voteId
  app.put("/vote/:voteId", (req, res) => {
    const vote = _.extend(req.vote, req.body)
    votes.update(vote)
      .then((vote) => {
        res.jsonp(vote)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })

  // DELETE: DELETE vote/voteId
  app.delete("/vote/:voteId", (req, res) => {
    votes.destroy(req.vote)
      .then((vote) => {
        res.jsonp(vote)
      }).catch((err) => {
        res.status(400).json(err)
      })
  })
}
