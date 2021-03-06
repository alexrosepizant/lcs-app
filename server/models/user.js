"use strict"

const crypto = require("crypto")
const mongoose = require("mongoose")

const  Schema = mongoose.Schema

/**
 * User Schema
 */
const UserSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  lastConnectionDate: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },

  // Connexion attributes
  salt: String,
  provider: String,
  hashedPassword: String,
  exclude: Boolean,

  // User infos
  avatar: String,
  presentation: String,
  birthday: Date,

  // User settings
  settings: {
    allMail: {
      type: Boolean,
      default: true,
    },
    articleMail:{
      type: Boolean,
      default: true,
    },
    userEventMail: {
      type: Boolean,
      default: true,
    },
    voteMail: {
      type: Boolean,
      default: true,
    },
  },

  // App attributes
  favoriteEuroTeam: String,
  euroPoints: Number,
  isEuroAdmin: Boolean,
})

/**
 * Virtuals
 */
UserSchema
  .virtual("password")
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
  }).get(function() {
    return this._password
  })

UserSchema
  .virtual("user_info")
  .get(function() {
    return {
      "_id": this._id,
      "username": this.username,
      "email": this.email,
      "avatar": this.avatar,
      "lastConnectionDate": this.lastConnectionDate,
      "favoriteEuroTeam": this.favoriteEuroTeam,
      "isEuroAdmin": this.isEuroAdmin,
    }
  })

/**
 * Validations
 */
const validatePresenceOf = (value) => {
  return value && value.length
}

UserSchema.path("email").validate((email) => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email)
}, "The specified email is invalid.")

UserSchema.path("email").validate((value, respond) => {
  mongoose.models["User"].findOne({email: value}, (err, user) => {
    if (err) throw err
    if (user) return respond(false)
    respond(true)
  })
}, "The specified email address is already in use.")

UserSchema.path("username").validate((value, respond) => {
  mongoose.models["User"].findOne({username: value}, (err, user) => {
    if (err) throw err
    if (user) return respond(false)
    respond(true)
  })
}, "The specified username is already in use.")

/**
 * Pre-save hook
 */
UserSchema.pre("save", (next) => {
  if (!this.isNew) {
    return next()
  }

  if (!validatePresenceOf(this.password) && !this.provider) {
    next(new Error("Invalid password"))
  } else {
    next()
  }
})

/**
 * Methods
 */
UserSchema.methods = {
	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword
  },

	/**
	 * Make salt
	 *
	 * @return {String}
	 * @api public
	 */
  makeSalt() {
    return crypto.randomBytes(16).toString("base64")
  },

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */
  encryptPassword(password) {
    if (!password || !this.salt) return ""
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, "base64"), 10000, 64, "sha1").toString("base64")
  },
}

mongoose.model("User", UserSchema)
