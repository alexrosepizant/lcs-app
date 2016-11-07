"use strict"

const moment = require("moment")
const mongoose = require("mongoose")
const  _ = require("lodash")

const User = mongoose.model("User")

/**
 * Request param
 */
exports.user = function(req, res, next, id) {
  User.findOne({
    _id: id,
  }).exec(function(err, user) {
    if (err) return next(err)
    if (!user) return next(new Error("Failed to load User " + id))
    req.profile = user
    next()
  })
}

/**
 * Check if user exist
 */
exports.exists = function(req, res, next) {
  const username = req.params.username
  User.findOne({username : username}, function(err, user) {
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
exports.create = function(req, res, next) {
  const newUser = new User(req.body)
  newUser.provider = "local"

  newUser.save(function(err) {
    if (err) {
      return res.status(400).json(err)
    }

    req.logIn(newUser, function(err) {
      if (err) return next(err)
      return res.json(newUser.user_info)
    })
  })
}

/**
 * Update user
 */
exports.update = function(req, res) {
  const user = _.extend(req.user, req.body)
  user.save(function(err) {
    if (err) {
      return res.send("users/signup", {
        errors: err.errors,
        user: user,
      })
    } else {
      res.jsonp(user)
    }
  })
}

/**
 * Send User
 */
exports.me = function(req, res) {
  res.jsonp(req.user || null)
}

/**
 * Return current user
 */
exports.findOne = function(req, res) {
  res.jsonp(req.profile)
}

/**
 *  Show profile
 *  returns {username, profile}
 */
exports.show = function(req, res, next) {
  const userId = req.params.userId

  User.findById(ObjectId(userId), function(err, user) {
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
exports.team = function(req, res) {
  User.find({}, "-password -salt -hashed_password -__v -provider").sort("-euroPoints")
		.exec(function(err, users) {
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
exports.incrementUsersPoints = function() {
  User.update({}, {
    $inc: {
      coins: 10,
    },
  }, function(err, affectedRows) {
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
exports.calculatePopularity = function() {
  User.find()
		.exec(function(err, users) {
  if (err) {
    console.warn("err: " + err)
  } else {
    _.each(users, function(user) {
      const newVal = "30"
      user.popularity = newVal
    })
  }
})
}


/**
 * Calculate popularity of users (call by cron)
 ***/
exports.getBirthdays = function() {
  User.find().exec(function(err, users) {
    if (err) {
      console.warn("err: " + err)
    } else {
      const today = moment()
      _.each(users, function(user) {
        if (user.birthday && today.diff(user.birthday, "days") === 0) {
          users.push(user)
        }
      })
      return users
    }
  })
}
