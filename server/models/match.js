"use strict"

const mongoose = require("mongoose")

const Schema = mongoose.Schema


/**
 * Euro match Schema
 */
const MatchSchema = new Schema({
  home: {
    type: String,
    trim: true,
  },
  away: {
    type: String,
    trim: true,
  },
  startsAt: {
    type: Date,
  },
  type: {
    type: String,
  },
  scoresUpdated: {
    type: Boolean,
  },
  scoreHome:{
    type: Number,
  },
  scoreAway:{
    type: Number,
  },
  flag: {
    type: String,
  },
  channels: [],
  bets: [new Schema({
    created: {
      type: Date,
      default: Date.now,
    },
    homeScore: {
      type: Number,
    },
    awayScore: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userPoints: {
      type: Number,
    },
  })],
  comments: [new Schema({
    created: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      default: "",
    },
    replies: [new Schema({
      created: {
        type: Date,
        default: Date.now,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        default: "",
      },
    })],
  })],
})

/**
 * Statics
 */
MatchSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id,
  }).exec(cb)
}

mongoose.model("Match", MatchSchema)
