"use strict"

const _ = require("lodash")
const mongoose = require("mongoose")
const moment = require("moment")

const UserEvent = mongoose.model("UserEvent")


exports.userEvent = (req, res, next) => {
  UserEvent.findOne({
    "_id": req.params.userEventId,
  })
  .populate("user", "_id name username avatar")
  .populate("guest", "_id name username avatar")
  .populate("guestUnavailable", "_id name username avatar")
  .populate("comments.user", "_id name username avatar")
  .populate("comments.replies.user", "_id name username avatar")
  .then((userEvent, err) => {
    if (err) return next(err)
    req.userEvent = userEvent
    next()
  })
}

/**
 * Find event by id
 */
exports.show = (req, res) => {
  UserEvent.findOne({
    "_id": req.params.userEventId,
  })
  .populate("user", "_id name username avatar")
  .populate("guest", "_id name username avatar")
  .populate("guestUnavailable", "_id name username avatar")
  .populate("comments.user", "_id name username avatar")
  .populate("comments.replies.user", "_id name username avatar")
  .then((userEvent, err) => {
    if (err) return next(err)
    res.jsonp(userEvent)
  })
}

/**
 * Create a userEvent
 */
exports.create = (req, res) => {
  const userEvent = new UserEvent(req.body)
  userEvent.user = req.user
  userEvent.save((err) => {
    if (err) {
      return res.status(400).json(err)
    } else {
      res.jsonp(userEvent)
    }
  })
}

/**
 * Update a userEvent
 */
exports.update = (req, res) => {
  let userEvent = req.userEvent
  userEvent = _.extend(userEvent, req.body)
  userEvent.save((err) => {
    if (err) {
      return res.status(400).json(err)
    } else {
      res.jsonp(userEvent)
    }
  })

}

/**
 * Delete an userEvent
 */
exports.destroy = (req, res) => {
  const userEvent = new UserEvent(req.userEvent)
  userEvent.remove((err) => {
    if (err) {
      return res.status(400).json(err)
    } else {
      res.jsonp(userEvent)
    }
  })
}

/**
 * List of userEvent
 */
exports.all = (req, res) => {

  // Filter on-going events
  const query = {
    startsAt: {
      "$gte": moment().startOf("day"),
    },
  }

  UserEvent.find(query)
    .sort("startsAt")
    .limit(40)
    .populate("user", "name username avatar")
    .populate("guest", "name username avatar")
    .populate("guestUnavailable", "name username avatar")
    .then((userEvent, err) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.jsonp(userEvent)
      }
    })
}
