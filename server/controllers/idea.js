"use strict"

const mongoose = require("mongoose")

const Idea = mongoose.model("Idea")
const userFields = "_id name username avatar"

/**
 * Find one
 */
exports.idea = (ideaId) => {
  return Idea.findOne({
    "_id": ideaId,
  })
  .populate("user", userFields)
}

/**
 * List of idea
 */
exports.all = (params) => {

  const query = (params.userId) ? {user: params.userId} : {}

  return Idea.find(query)
    .sort("startsAt")
    .populate("user", userFields)
}

/**
 * Create a idea
 */
exports.create = (idea) => {
  const _idea = new Idea(idea)
  return _idea.save()
}

/**
 * Update a idea
 */
exports.update = (idea) => {
  return idea.save()
    .then((idea) => {
      return this.idea(idea._id)
    })
}

/**
 * Delete an idea
 */
exports.destroy = (idea) => {
  return idea.remove()
}
