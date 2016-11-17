"use strict"

const mongoose = require("mongoose")

const Schema = mongoose.Schema

// Comment Schema
const chatSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  room: {
    type: String,
  },
})

mongoose.model("Chat", chatSchema)
