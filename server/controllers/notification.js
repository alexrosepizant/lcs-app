"use strict"

const mongoose = require("mongoose")

const Notification = mongoose.model("Notification")
const userFields = "_id username avatar"

/**
 * List of notification
 */
exports.all = (params) => {
  const query = (params.userId) ? {user: params.userId} : {}
  const limit = (params.limit) ? parseInt(params.limit) : 25

  return Notification.find(query)
    .sort("-created")
    .limit(limit)
    .populate("user", userFields)
}

/**
 * Create a notification
 */
exports.create = (notification) => {
  return new Notification(notification).save()
}
