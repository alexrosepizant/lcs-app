"use strict"

const mongoose = require("mongoose")
const moment = require("moment")

const UserEvent = mongoose.model("UserEvent")
const userFields = "_id name username avatar"

/**
 * Find one
 */
exports.userEvent = (userEventId) => {
  return UserEvent.findOne({
    "_id": userEventId,
  })
  .populate("user", userFields)
  .populate("guest", userFields)
  .populate("guestUnavailable", userFields)
  .populate("comments.user", userFields)
  .populate("comments.replies.user", userFields)
}

/**
 * List of userEvent
 */
exports.all = (params) => {

  const query = (params.userId) ? {user: params.userId} : {}

  // Filter on-going events
  query.startsAt = {
    "$gte": moment().startOf("day"),
  }

  return UserEvent.find(query)
    .sort("startsAt")
    .populate("user", userFields)
    .populate("guest", userFields)
    .populate("guestUnavailable", userFields)
    .populate("comments.user", userFields)
    .populate("comments.replies.user", userFields)
}

/**
 * Create a userEvent
 */
exports.create = (userEvent) => {
  return new UserEvent(userEvent).save()
}

/**
 * Update a userEvent
 */
exports.update = (userEvent) => {
  return userEvent.save()
    .then((userEvent) => this.userEvent(userEvent._id))
}

/**
 * Delete an userEvent
 */
exports.destroy = (userEvent) => {
  return userEvent.remove()
}
