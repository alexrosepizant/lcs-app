"use strict"

// UserEvent routes use notification controller
const notifications = require("../controllers/notification")
const authorization = require("./middlewares/authorization")

module.exports = (app) => {

  /**
  CRUD endPoints
  Note that notifications can't be update or delete, there are a static image of a content when it's created
  **/

  // CREATE: POST /notification
  app.post("/notification", authorization.requiresLogin, (req, res) => {
    notifications.create(Object.assign(req.body, {
      user: req.user,
    })).then((notification) => {
      res.jsonp(notification)
    }).catch((err) => {
      res.status(400).json(err)
    })
  })

  // READ ALL: GET notification
  app.get("/notification", (req, res) => {
    notifications.all(req.query)
      .then((notifications) => {
        res.jsonp(notifications)
      }).catch((err) => {
        res.status(400).json(err)
      })
  })
}
