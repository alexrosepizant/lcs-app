"use strict"

const mongoose = require("mongoose")

const	Schema = mongoose.Schema

/**
 * Notification Schema
 */
const NotificationSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    default: "",
    trim: true,
  },
  type: {
    type: String,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  contentId: {
    type: String,
  },
  contentType: {
    type: String,
  },
})

/**
 * Statics
 */
NotificationSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id,
  }).populate("user", "_id name username avatar").exec(cb)
}

mongoose.model("Notification", NotificationSchema)
