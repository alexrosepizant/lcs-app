"use strict"

const mongoose = require("mongoose")
const _ = require("lodash")

const Comment = mongoose.model("Comment")

exports.comment = (req, res, next) => {
  return Comment.findOne({
    _id: req.params.id,
  })
	.populate("user")
  .then((comment, err) => {
    if (err) return next(err)
    req.comment = comment
    next()
  })
}

exports.findAllComments = (req, res) => {
  const query = (req.query.userId) ? {
    user: req.query.userId,
  } : {}

  return Comment.find(query)
    .then((comments, err) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.jsonp(comments)
      }
    })
}

exports.findCommentById = (req, res) => {
  return Comment.findOne({
    _id: req.params.id,
  })
  .populate("user")
  .then((comment, err) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.jsonp(comment)
    }
  })
}

exports.addComment = (req, res) => {
  const newComment = req.body
  newComment.user = req.user

  return Comment.create(newComment)
    .then((comment, err) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.jsonp(comment)
      }
    })
}

exports.updateComment = (req, res) => {
  let comment = req.comment
  comment = _.extend(comment, req.body)

  return comment.save()
    .then((comment, err) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.jsonp(article)
      }
    })
}

/**
 * Count of comments
 */
exports.getItemsCount = (req, res) => {
  return Comment.count({})
    .then((count, err) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.jsonp(count)
      }
    })
}
