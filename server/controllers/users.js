"use strict"

const moment = require("moment")
const mongoose = require("mongoose")
const  _ = require("lodash")

const User = mongoose.model("User")
const Notification = mongoose.model("Notification")

/**
* Request param
*/
exports.user = (id) => {
  return User.findOne({
    _id: id,
  }).then((user, err) => {
    if (err) {
      return Promise.reject(err)
    }

    if (!user) {
      return Promise.reject("Failed to load User " + id)
    }

    return user
  })
}

/**
* Check if user exist
*/
exports.exists = (username) => {
  User.findOne({username : username})
    .then((user, err) => {
      if (err) {
        return Promise.reject("Failed to load User " + username)
      } else {
        return (user)
      }
    })
}

/**
* Create user
*/
exports.create = (user) => {
  const newUser = new User(user)
  newUser.provider = "local"
  return newUser.save()
    .then((user, err) => {
      if (err) {
        return Promise.reject(err)
      } else {
        return user
      }
    })
}

/**
* Update user
*/
exports.update = (user) => {
  const _user = new User(user)

  // Manage password change
  if (user.newPassword) {
    if (_user.authenticate(_user.password)) {
      _user.password = user.newPassword
    } else {
      return Promise.reject("Old password is not valid")
    }
  }

  return User.findByIdAndUpdate(_user._id, _user, {upsert: true})
    .then((updatedUser, err) => {
      if (err) {
        return Promise.reject(err)
      } else {
        return updatedUser
      }
    })
}

/**
* Return all users
*/
exports.team = () => {
  return User.find({}, "-password -salt -hashed_password -__v -provider")
    .then((users, err) => {
      if (err) {
        return Promise.reject(err)
      } else {
        return users
      }
    })
}

/**
* Return top 5 of article authors
*/
exports.getAuthorsByArticleCount = () => {
  return Notification.aggregate([{
    $match:{
      $or:[
          {type: "standard"},
          {type: "album"},
          {type: "video"},
      ]},
  },{
    $group: {
      _id: "$user",
      count: {$sum: 1},
    },
  },{
    $sort : {"count": -1},
  },{
    $limit : 5,
  },
  ]).then((users) => {
    return User.populate(users, {path: "_id"})
  })
}

/**
* Increment coins of all users (call by cron)
***/
exports.incrementUsersPoints = () => {
  return User.update({}, {
    $inc: {
      coins: 30,
    },
  }).then((affectedRows, err) => {
    if (err) {
      return Promise.reject(err)
    } else {
      console.warn("Count of updated users " + affectedRows)
      return Promise.resolve()
    }
  })
}

/**
* Get users who have their birthday today
***/
exports.getUsersWithBirthday = () => {
  return User.find()
    .then((users, err) => {
      if (err) {
        return Promise.reject(err)
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
