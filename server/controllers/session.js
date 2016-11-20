"use strict"

const passport = require("passport")

/**
 * Session
 * returns info on authenticated user
 */
exports.session = (req, res) => {
  res.json(req.user.user_info)
}

/**
 * Logout
 * returns nothing
 */
exports.logout = (req, res) => {
  if (req.user) {
    req.logout()
    res.sendStatus(200)
  } else {
    res.status(400).send("Not logged in")
  }
}

/**
 *  Login
 *  requires: {email, password}
 */
exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    const error = err || info
    if (error) {
      return res.status(400).json(error)
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.send(err)
      }
      res.json(req.user.user_info)
    })
  })(req, res, next)
}
