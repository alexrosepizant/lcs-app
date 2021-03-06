"use strict"

const mongoose = require("mongoose")

const Idea = mongoose.model("Idea")
const userFields = "_id name username avatar"

/**
 * Find one
 */
exports.idea = (ideaId) => {
  return Idea.findById(ideaId)
    .populate("user", userFields)
}

/**
 * List of idea
 */
exports.all = (params) => {
  const query = (params.userId) ? {user: params.userId} : {}
  query.status = {$ne: 3}

  return Idea.find(query)
    .sort("startsAt")
    .populate("user", userFields)
}

/**
 * Create a idea
 */
exports.create = (idea) => {
  return new Idea(idea).save()
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
