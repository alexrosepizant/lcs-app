"use strict"

const mongoose = require("mongoose")

const Schema = mongoose.Schema

/**
 * Idea Schema
 */
const IdeaSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  categories: [],
  like: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
})

mongoose.model("Idea", IdeaSchema)
