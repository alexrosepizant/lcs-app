"use strict"

const moment = require("moment")
const mongoose = require("mongoose")
const  _ = require("lodash")

const User = mongoose.model("User")

/**
 * Request param
 */
exports.user = (req, res, next, id) => {
  User.findOne({
    _id: id,
  }).exec((err, user) => {
    if (err) return next(err)
    if (!user) return next(new Error("Failed to load User " + id))
    req.profile = user
    next()
  })
}

/**
 * Check if user exist
 */
exports.exists = (req, res, next) => {
  const username = req.params.username
  User.findOne({username : username}, (err, user) => {
    if (err) {
      return next(new Error("Failed to load User " + username))
    }

    if (user) {
      res.json({exists: true})
    } else {
      res.json({exists: false})
    }
  })
}

/**
 * Create user
 */
exports.create = (req, res, next) => {
  const newUser = new User(req.body)
  newUser.provider = "local"

  newUser.save((err) => {
    if (err) {
      return res.status(400).json(err)
    }

    req.logIn(newUser, (err) => {
      if (err) return next(err)
      return res.json(newUser.user_info)
    })
  })
}

/**
 * Update user
 */
exports.update = (req, res) => {
  const user = _.extend(req.user, req.body)
  user.save((err) => {
    if (err) {
      return res.status(400).json(err)
    } else {
      res.jsonp(user)
    }
  })
}

/**
 * Send User
 */
exports.me = (req, res) => {
  res.jsonp(req.user || null)
}

/**
 * Return current user
 */
exports.findOne = (req, res) => {
  res.jsonp(req.profile)
}

/**
 *  Show profile
 *  returns {username, profile}
 */
exports.show = (req, res, next) => {
  const userId = req.params.userId

  User.findById(ObjectId(userId), (err, user) => {
    if (err) {
      return next(new Error("Failed to load User"))
    }
    if (user) {
      res.send({username: user.username, profile: user.profile})
    } else {
      res.send(404, "USER_NOT_FOUND")
    }
  })
}

/**
 * Return all users
 */
exports.team = (req, res) => {
  User
    .find({}, "-password -salt -hashed_password -__v -provider")
		.exec((err, users) => {

  if (err) {
    res.render("error", {
      status: 500,
    })
  } else {
    res.jsonp(users)
  }
})
}

/**
 * Increment coins of all users (call by cron)
 ***/
exports.incrementUsersPoints = () => {
  User.update({}, {
    $inc: {
      coins: 10,
    },
  }, (err, affectedRows) => {
    if (err) {
      console.warn("err: " + err)
    } else {
      console.warn("Count of updated users " + affectedRows)
    }
  })
}


/**
 * Calculate popularity of users (call by cron)
 ***/
exports.calculatePopularity = () => {
  User.find()
		.exec((err, users) => {
  if (err) {
    console.warn("err: " + err)
  } else {
    _.each(users, (user) => {
      const newVal = "30"
      user.popularity = newVal
    })
  }
})
}


/**
 * Get users who have their birthday today
 ***/
exports.getUsersWithBirthday = () => {
  User.find().exec((err, users) => {
    if (err) {
      console.warn("err: " + err)
    } else {
      const today = moment()
      _.each(users, (user) => {
        if (user.birthday && today.diff(user.birthday, "days") === 0) {
          users.push(user)
        }
      })
      return users
    }
  })
}
