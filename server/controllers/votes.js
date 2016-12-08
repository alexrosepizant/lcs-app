"use strict"

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
    .then((votes, err) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.jsonp(votes)
      }
    })
}

/**
 * Create article from ended vote to see results
 **/
exports.closeVotes = () => {
  console.warn("close votes")
  // Fetch votes that are ended
  const query = {
    "endsAt": {
      "$lt": new Date(),
    },
  }

  Vote.find(query)
    .sort("-created")
    .then((votes, err) => {
      if (err) {
        console.warn("Error when to fetch votes " + err)
      } else {
        _.each(votes, (vote) => {
          const article = new Article({
            title: "Résultats de vote",
            user: vote.user,
            content: vote.content,
            type: "vote",
            comments: [],
            created: vote.created,
            endsAt: vote.endsAt,
            yes: vote.yes.map((userId) => {
              return {
                user: userId,
              }
            }),
            no: vote.no.map((userId) => {
              return {
                user: userId,
              }
            }),
            blank: vote.blank.map((userId) => {
              return {
                user: userId,
              }
            }),
          })

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
    })
}
