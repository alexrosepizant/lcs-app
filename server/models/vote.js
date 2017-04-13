"use strict"

const mongoose = require("mongoose")

const	Schema = mongoose.Schema

/**
 * Suggestion Schema
 */
const VoteSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
    default: "",
    trim: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  endsAt: {
    type: Date,
  },
  answers: [new Schema({
    content: {
      type: String,
      default: "",
    },
    users: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
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
VoteSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id,
  }).populate("user", "name username avatar").exec(cb)
}

mongoose.model("Vote", VoteSchema)
