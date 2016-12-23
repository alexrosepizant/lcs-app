"use strict"

// User routes use users controller
const passport = require("passport")
const users = require("../controllers/users")
const authorization = require("./middlewares/authorization")

module.exports = (app) => {

  app.get("/auth/check_username/:username", (req, res, next) => {
    users.exists(req.params.username)
     .then((userExist) => {
       res.json({
         exists: userExist,
       })
     })
     .catch((err) => {
       return next(err)
     })
  })

  /**
   * Session
   * returns info on authenticated user
   */
  app.get("/auth/session", authorization.requiresLogin, (req, res) => {
    req.user.lastConnectionDate = new Date()
    return users.update(req.user)
      .then(() => {
        res.json(req.user.user_info)
      })
      .catch(() => {
        res.json(req.user.user_info)
      })
  })

  /**
   *  Login
   *  requires: {email, password}
   */
  app.post("/auth/session", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      const error = err || info
      if (error) {
        return res.status(400).json(error)
      }

      return req.logIn(user, (err) => {
        if (err) {
          res.status(400).json(err)
        } else {
          res.jsonp(user.user_info)
        }
      })
    })(req, res, next)
  })

  /**
  * Create user
  */
  app.post("/auth/users", (req, res, next) => {
    users.create(req.body)
    .then((newUser) => {
      req.logIn(newUser, (err) => {
        if (err) {
          return next(err)
        } else {
          res.jsonp(newUser.user_info)
        }
      })
    })
    .catch((err) => {
      return next(err)
    })
  })

  /**
   * Logout
   * returns nothing
   */
  app.delete("/auth/session", (req, res) => {
    if (req.user) {
      req.logout()
      res.sendStatus(200)
    } else {
      res.status(400).send("Not logged in")
    }
  })

  // CRUD endPoints
  app.get("/users", (req, res) => {
    users.team()
    .then((users) => {
      res.jsonp(users)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
  })

  /**
  * Send User
  */
  app.get("/users/me", (req, res) => {
    res.jsonp(req.user || null)
  })

  app.put("/users/:userId", (req, res) => {
    users.update(req.body)
      .then((user) => {
        res.jsonp(user)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })

  /**
  * Return current user
  */
  app.get("/users/:userId", (req, res) => {
    res.jsonp(req.profile)
  })

  // Setting up the userId param
  app.param("userId", (req, res, next, id) => {
    return users.user(id)
     .then((user) => {
       req.profile = user
       return next()
     })
     .catch((err) => {
       return next(err)
     })
  })
}
