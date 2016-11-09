"use strict"

const moment = require("moment")
const _ = require("lodash")
const mongoose = require("mongoose")

const Vote = mongoose.model("Vote")
const Article = mongoose.model("Article")


/**
 * Find vote by id
 */
exports.vote = function(req, res, next, id) {
  Vote.load(id, function(err, vote) {
    if (err) return next(err)
    if (!vote) return next(new Error("Failed to load vote " + id))
    req.vote = vote
    next()
  })
}

/**
 * Create a vote
 */
exports.create = function(req, res) {
  const vote = new Vote(req.body)
  vote.user = req.user
  vote.save(function(err) {
    console.log(err)
    if (err) {
      return res.send("users/signup", {
        errors: err.errors,
        vote: vote,
      })
    } else {
      res.jsonp(vote)
    }
  })
}

/**
 * Update a vote
 */
exports.update = function(req, res) {
  let vote = req.vote
  vote = _.extend(vote, req.body)
  vote.save(function(err) {
    if (err) {
      return res.send("users/signup", {
        errors: err.errors,
        vote: vote,
      })
    } else {
      res.jsonp(vote)
    }
  })
}

/**
 * Delete an vote
 */
exports.destroy = function(req, res) {
  const vote = req.vote
  vote.remove(function(err) {
    if (err) {
      return res.send("users/signup", {
        errors: err.errors,
        vote: vote,
      })
    } else {
      res.jsonp(vote)
    }
  })
}

/**
 * Show a vote
 */
exports.show = function(req, res) {
  res.jsonp(req.vote)
}

/**
 * List of votes
 */
exports.all = function(req, res) {

  const perPage = req.query.perPage
  const page = req.query.page

  Vote.find({})
		.sort("-created")
		.limit(perPage)
		.skip(perPage * page)
		.populate("user", "_id name username avatar")
		.exec(function(err, votes) {
  if (err) {
    res.render("error", {
      status: 500,
    })
  } else {
    res.jsonp(votes)
  }
})
}

/**
 * Create article from ended vote to see results
 **/
exports.closeVotes = function() {

  const date = moment().subtract(1, "months").toISOString()

  Vote.find({
    "created": {
      "$lt": date,
    },
  })
		.sort("-created")
		.exec(function(err, votes) {

  if (err) {
    console.warn("Error when to fetch votes " + err)
  } else {
    _.each(votes, function(vote) {

      const yes = []
      const no = []
      const blank = []

      const article = new Article({
        title: "Vote",
        user: vote.user,
        content: vote.content,
        type: "vote",
        comments: [],
        created: vote.created,
      })

      _.each(vote.yes, function(userId) {
        yes.push({
          user: userId,
        })
      })
      article.yes = yes

      _.each(vote.blank, function(userId) {
        blank.push({
          user: userId,
        })
      })
      article.blank = blank

      _.each(vote.no, function(userId) {
        no.push({
          user: userId,
        })
      })
      article.no = no

      article.save(function(err) {

        if (err) {
          console.warn("Error when trying to save new article " + err)
        } else {

          vote.remove(function(err) {
            if (err) {
              console.warn("Error when trying to remove vote " + err)
            } else {
              console.warn("Vote removed with success")
            }
          })
        }
      })
    })
  }
})}
