/**
* Global dependencies includes db models and routes.
*/
const moment = require("moment")
const mongoose = require("mongoose")
const _ = require("lodash")
const config = require("../../server/config")
const utils = require("../../server/utils")

// Bootstrap db connection
utils.bootstrapApp()
mongoose.Promise = global.Promise

/**
Define functions
**/
const User = mongoose.model("User")

const migrateUsers = () => {
  const userPromises = []
  return User.find({})
  .then((users, err) => {
    if (err) {
      return Promise.reject("Error when trying to fetch users " + err)
    } else {

      console.log(users.length + " users to migrate: ")
      _.each(users, (user) => {
        user.hashedPassword = user.hashed_password
        userPromises.push(User.findByIdAndUpdate(user._id, user, {upsert: true})
          .then((err) => {
            if (err) {
              console.log("Error when trying to save user " + err)
            } else {
              console.log("Save user: " + user.username)
            }
          }))
      })

      return Promise.all(userPromises)
    }
  })
}

/**
Execute Scripts
**/
mongoose.connect(config.db)
.then(() => {
  utils.titleLog("Start script migration...")
})
.then(() => {
  utils.titleLog("Prepare to migrate users")
  return migrateUsers()
})
.then(() => {
  utils.titleLog("Script migration ended")
  process.exit(-1)
})
.catch((err) => {
  utils.titleLog(err)
  process.exit(-1)
})
