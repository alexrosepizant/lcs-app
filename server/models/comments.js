"use strict"

const mongoose = require("mongoose")

const Schema = mongoose.Schema

// Comment Schema
const commentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  contentId: {
    type: String,
  },
  contentType: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
})

mongoose.model("Comment", commentSchema)
