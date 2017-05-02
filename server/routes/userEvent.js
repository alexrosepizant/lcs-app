"use strict"

// UserEvent routes use userEvent controller
const _ = require("lodash")
const userEvents = require("../controllers/userEvent")
const notifications = require("../controllers/notification")
const mail = require("../controllers/mail")
const authorization = require("./middlewares/authorization")

module.exports = (app) => {

  // Setting up the userEventId param
  app.param("userEventId", (req, res, next) => {
    userEvents.userEvent(req.params.userEventId)
      .then((userEvent, err) => {
        if (err) return next(err)
        req.userEvent = userEvent
        next()
      })
  })

  /**
  CRUD endPoints
  **/

  // CREATE: POST /userEvent
  app.post("/userEvent", authorization.requiresLogin, (req, res) => {
    userEvents.create(Object.assign(req.body, {
      user: req.user,
    })).then((userEvent) => {
      // create notification
      notifications.create({
        title: userEvent.title,
        contentId: userEvent._id,
        type: "userEvent",
        user: userEvent.user,
      })

      // send mail
      mail.sendToAll("userEventMail", {
        subject : userEvent.user.username + " a créé un nouvel évènement.",
        html : "Viens dire si tu peux venir à <b>" + userEvent.title + "</b>. "
          + "<b><a href='http://lescoqssoccer.fr/#/agenda'><br/><br/>"
          + "C'est par ici :)</a></b>",
      })

      res.jsonp(userEvent)
    }).catch((err) => {
      res.status(400).json(err)
    })
  })

  // READ ALL: GET userEvent
  app.get("/userEvent", (req, res) => {
    userEvents.all(req.query)
      .then((userEvents) => {
        res.jsonp(userEvents)
      }).catch((err) => {
        res.status(400).json(err)
      })
  })

  // READ ONE: GET userEvent/userEventId
  app.get("/userEvent/:userEventId", (req, res) => {
    userEvents.userEvent(req.params.userEventId)
      .then((userEvent) => {
        res.jsonp(userEvent)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })

  // UPDATE: PUT userEvent/userEventId
  app.put("/userEvent/:userEventId", (req, res) => {
    const userEvent = _.extend(req.userEvent, req.body)
    userEvents.update(userEvent)
      .then((userEvent) => {
        res.jsonp(userEvent)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })

  // DELETE: DELETE userEvent/userEventId
  app.delete("/userEvent/:userEventId", (req, res) => {
    userEvents.destroy(req.userEvent)
      .then((userEvent) => {
        res.jsonp(userEvent)
      }).catch((err) => {
        res.status(400).json(err)
      })
  })
}
