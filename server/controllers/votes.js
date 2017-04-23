"use strict"

const mongoose = require("mongoose")

const Vote = mongoose.model("Vote")
const userFields = "_id name username avatar"

/**
 * Find one
 */
exports.vote = (voteId) => {
  return Vote.findById(voteId)
    .populate("user", userFields)
    .populate("answers.users", userFields)
    .populate("comments.user", userFields)
    .populate("comments.replies.user", userFields)
}

/**
 * List of vote
 */
exports.all = (params) => {

  const perPage = params.perPage || 20
  const page = params.page || 0

  return Vote.find({})
     .sort("-created")
     .limit(perPage)
     .skip(perPage * page)
     .populate("user", userFields)
     .populate("answers.users", userFields)
     .populate("comments.user", userFields)
     .populate("comments.replies.user", userFields)
}

/**
 * Create a vote
 */
exports.create = (vote) => {
  return new Vote(vote).save()
}

/**
 * Update a vote
 */
exports.update = (vote) => {
  return vote.save()
    .then((vote) => this.vote(vote._id))
}

/**
 * Delete an vote
 */
exports.destroy = (vote) => {
  return vote.remove()
}
