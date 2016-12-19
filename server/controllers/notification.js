"use strict"

const mongoose = require("mongoose")

const Notification = mongoose.model("Notification")
const userFields = "_id name username avatar"

/**
 * List of notification
 */
exports.all = (params) => {
  const query = (params.userId) ? {user: params.userId} : {}
  const limit = (params.limit) ? params.limit : 30

  return Notification.find(query)
    .sort("created")
    .limit(limit)
    .populate("user", userFields)
}

/**
 * Create a notification
 */
exports.create = (notification) => {
  const _notification = new Notification(notification)
  return _notification.save()
}
