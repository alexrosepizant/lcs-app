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
  previousConnectionDate: {
    type: Date,
    default: Date.now,
  },
  name: String,
  lastname: String,
  email: String,
  username: {
    type: String,
    unique: true,
  },
  hashed_password: String,
  provider: String,
  salt: String,
  avatar: {
    type: String,
    default: "/img/Professor.png",
  },
  community: [],
  preferences: {
    notifyCommunity: {
      type: Boolean,
      default: true,
    },
  },
  skills: [],
  coins: Number,
  presentation: String,
  popularity: Number,
  readArticles: {
    type: Array,
    "default": [],
  },
  conversations: [{
    conversationId: String,
    lastUpdate: Date,
  }],
  readVotes: {
    type: Array,
    "default": [],
  },
  readAlbums: {
    type: Array,
    "default": [],
  },
  favoriteEuroTeam: {
    type: String,
  },
  euroPoints: {
    type: Number,
  },
  isEuroAdmin: {
    type: Boolean,
  },
  birthday :{
    type: Date,
  },
  exclude: Boolean,
})

/**
 * Virtuals
 */
UserSchema
  .virtual("password")
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
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
    }
  })

/**
 * Validations
 */
const validatePresenceOf = function(value) {
  return value && value.length
}

UserSchema.path("email").validate(function(email) {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email)
}, "The specified email is invalid.")

UserSchema.path("email").validate(function(value, respond) {
  mongoose.models["User"].findOne({email: value}, function(err, user) {
    if (err) throw err
    if (user) return respond(false)
    respond(true)
  })
}, "The specified email address is already in use.")

UserSchema.path("username").validate(function(value, respond) {
  mongoose.models["User"].findOne({username: value}, function(err, user) {
    if (err) throw err
    if (user) return respond(false)
    respond(true)
  })
}, "The specified username is already in use.")

/**
 * Pre-save hook
 */
UserSchema.pre("save", function(next) {
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
    return this.encryptPassword(plainText) === this.hashed_password
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
