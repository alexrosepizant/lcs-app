"use strict"

const moment = require("moment")
const _ = require("lodash")
const mongoose = require("mongoose")

const Vote = mongoose.model("Vote")
const Article = mongoose.model("Article")


/**
 * Find vote by id
 */
exports.vote = (req, res, next, id) => {
  Vote.load(id, (err, vote) => {
    if (err) return next(err)
    if (!vote) return next(new Error("Failed to load vote " + id))
    req.vote = vote
    next()
  })
}

/**
 * Create a vote
 */
exports.create = (req, res) => {
  const vote = new Vote(req.body)
  vote.user = req.user
  vote.save((err) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.jsonp(vote)
    }
  })
}

/**
 * Update a vote
 */
exports.update = (req, res) => {
  let vote = req.vote
  vote = _.extend(vote, req.body)
  vote.save((err) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.jsonp(vote)
    }
  })
}

/**
 * Delete an vote
 */
exports.destroy = (req, res) => {
  const vote = req.vote
  vote.remove((err) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.jsonp(vote)
    }
  })
}

/**
 * Show a vote
 */
exports.show = (req, res) => {
  res.jsonp(req.vote)
}

/**
 * List of votes
 */
exports.all = (req, res) => {

  const perPage = req.query.perPage
  const page = req.query.page

  Vote.find({})
		.sort("-created")
		.limit(perPage)
		.skip(perPage * page)
		.populate("user", "_id name username avatar")
		.exec((err, votes) => {
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
exports.closeVotes = () => {

  const date = moment().subtract(1, "months").toISOString()

  Vote.find({
    "created": {
      "$lt": date,
    },
  })
		.sort("-created")
		.exec((err, votes) => {

  if (err) {
    console.warn("Error when to fetch votes " + err)
  } else {
    _.each(votes, (vote) => {

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

      _.each(vote.yes, (userId) => {
        yes.push({
          user: userId,
        })
      })
      article.yes = yes

      _.each(vote.blank, (userId) => {
        blank.push({
          user: userId,
        })
      })
      article.blank = blank

      _.each(vote.no, (userId) => {
        no.push({
          user: userId,
        })
      })
      article.no = no

      article.save((err) => {

        if (err) {
          console.warn("Error when trying to save new article " + err)
        } else {

          vote.remove((err) => {
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

exports.changeQuoteToVote = () => {
  Article.find({
    type: "quote",
  }).exec((err, articles) => {
    _.each(articles, (article) => {
      article.type = "vote"
      article.save((err) => {
        if (err) {
          console.warn("error when trying to save user")
        } else {
          console.warn("article updated")
        }
      })
    })
  })
}
