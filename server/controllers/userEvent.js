"use strict"

const mongoose = require("mongoose")
const moment = require("moment")

const UserEvent = mongoose.model("UserEvent")
const userFields = "_id name username avatar"

/**
 * Find one
 */
exports.userEvent = (userEventId) => {
  return UserEvent.findById(userEventId)
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
  let sort = "startsAt"

  // Filter on-going events
  if (params.ongoing) {
    query.startsAt = {
      "$gte": moment().startOf("day"),
    }
  }

  if (params.past) {
    query.startsAt = {
      "$lt": moment().startOf("day"),
    }
    sort = "-startsAt"
  }

  return UserEvent.find(query)
    .sort(sort)
    .limit(20)
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
