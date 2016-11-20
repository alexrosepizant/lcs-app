"use strict"

const mongoose = require("mongoose")
const _ = require("lodash")

const Match = mongoose.model("Match")
const User = mongoose.model("User")
const UserEvent = mongoose.model("UserEvent")
const EuroData = require("../ressources/euro.json")
// const EuroDataR16 = require("../server/ressources/euro_qf.json")
// const EuroDataQF = require("../server/ressources/euro_qf_2.json")
// const EuroDatasSF = require("../server/ressources/euro_SF.json")
// const EuroDatasFi = require("../server/ressources/euro_Fi.json")

exports.match = (req, res, next) => {
  Match.findOne({
    _id: req.params.id,
  })
  .populate("bets.user", "_id name username avatar")
  .populate("comments.user", "_id name username avatar")
  .populate("comments.replies.user", "_id name username avatar")
  .populate("user", "_id name username avatar")
  .exec((err, match) => {
    if (err) return next(err)
    req.match = match
    next()
  })
}

exports.findAllMatchs = (req, res) => {

  const query = (req.query.endedMatch === "true") ? {
    startsAt: {
      "$lt": new Date(),
    },
  } : {}

  Match.find(query)
  .sort("startsAt")
  .populate("bets.user", "_id name username avatar")
  .populate("user", "_id name username avatar")
  .exec((err, matchs) => {
    res.send(matchs)
  })
}

exports.findMatchById = (req, res) => {
  Match.findOne({
    _id: req.params.id,
  })
  .populate("bets.user", "_id name username avatar")
  .populate("comments.user", "_id name username avatar")
  .populate("comments.replies.user", "_id name username avatar")
  .populate("user", "_id name username avatar")
  .exec((err, match) => {
    if (err) console.log("error finding match: " + err)
    res.send(match)
  })
}

exports.addMatch = (req, res) => {
  const newMatch = req.body
  newMatch.user = req.user
  Match.create(newMatch, (err, match) => {
    if (err) console.log("error: " + err)
    res.send(match)
  })
}

exports.deleteMatch = (req, res) => {
  Match.findById(req.params.id, (err) => {
    if (!err) {
      res.send(req.body)
    } else {
      console.log("error: " + err)
    }
  })
}

const getPointsFromMatch = (match, user) => {

  const GOOD_SCORE = 5
  const GOOD_WINNER = 2
  const ACCEPTED_GOAL_DIFFERENCE = 1

  /* Winner code:
  1 for home team
  2 for away team
  -1 for nul score
  */

  let points = 0
  const scoreHome = match.scoreHome
  const scoreAway = match.scoreAway
  const winner = (scoreHome > scoreAway) ? 1 : ((scoreHome < scoreAway) ? 2 : -1)
  const goalDifference = scoreHome - scoreAway

  const _userbets = _.filter(match.bets, (bet) => {
    return bet.user.toString() === user._id.toString()
  })
  const userBet = (_userbets.length > 0) ? _userbets[_userbets.length - 1] : null

  if (userBet) {

    console.warn("User has bet on the match")

    const userScoreHome = userBet.homeScore
    const userScoreAway = userBet.awayScore
    const userWinner = (userScoreHome > userScoreAway) ? 1 : ((userScoreHome < userScoreAway) ? 2 : -1)
    const userGoalDifference = userScoreHome - userScoreAway

    if (userScoreHome === scoreHome && userScoreAway === scoreAway) {
      points += GOOD_SCORE
    } else {

      if (userWinner === winner) {
        points += GOOD_WINNER
      }

      if (goalDifference === userGoalDifference) {
        points += ACCEPTED_GOAL_DIFFERENCE
      }
    }

  } else {
    console.warn("User has not bet on the match")
  }

  if (match.type === "SF") {
    return points * 2
  }

  if (match.type === "FINALE") {
    return points * 3
  }

  return points
}

const updateUserScores = () => {
  let _users = []
  let canUpdateUsers = true

  User.find({}).exec().then((users, err) => {
    if (err) {
      console.warn("Error when trying to fetch users: " + err)
    } else {

      // keep users in array to updates
      _users = users

      // fetch matchs
      return Match.find({
        startsAt: {
          "$lt": new Date(),
        },
        scoresUpdated: {
          $exists: false,
        },
      })
      .sort("-created")
      .exec()

    }
  }).then((matchs, err) =>{

    if (err) {
      console.warn("Error when trying to fetch matchs: " + err)
    } else {
      _.each(matchs, (match) => {

        if (match.scoreHome !== undefined && match.scoreAway !== undefined) {

          console.warn("Match to update")
          _.each(_users, (user) => {
            if (!user.euroPoints) {
              user.euroPoints = 0
            }

            const userPointOfMatch = getPointsFromMatch(match, user)
            user.euroPoints += userPointOfMatch
          })

          match.scoresUpdated = true
          match.save(() => {
            if (err) {
              console.warn("Error when trying to update match... " + match.home + " - " + match.away)
              canUpdateUsers = false
            } else {
              console.warn("Match updated succefully")
            }
          })

        } else {
          console.warn("Match: " + match.home + " - " + match.away + " has no scores yet!")
        }
      })

      if (canUpdateUsers) {
        _.each(_users, (user) => {
          user.save((err) => {
            if (err) {
              console.warn("Error when trying to update user scores : " + err)
            } else {
              console.warn("User " + user.username + " has been updated successfully")
            }
          })
        })
      }
    }
  })
}

const getNameOfCountryCode = function(teams, code) {
  let name = ""
  _.each(teams, function(team) {
    if (team.code === code) {
      name = team.name
    }
  })

  return name
}

exports.addMatchs = () => {
  const matchs = EuroData.matchs
  const teams = EuroData.teams
  let currentMatch
  const promises = []

  _.each(matchs, (match) => {
    currentMatch = new Match(match)
    promises.push(currentMatch.save()
      .then((_matchObject, err) => {
        if (err) {
          console.warn("Error when adding match: " + err)
        } else {
          console.warn("Successfuly add match")
          const homeName = getNameOfCountryCode(teams, match.home)
          const awayName = getNameOfCountryCode(teams, match.away)
          const userEvent = new UserEvent({
            title: homeName + " - " + awayName,
            type: "inverse",
            eventType: "other",
            content: "Match de l'euro 2016 du groupe " + match.type,
            startsAt: match.startsAt,
            endsAt: match.startsAt,
            editable: false,
            deletable: false,
            incrementsBadgeTotal: true,
            guest: [],
            subType: "euroMatch",
            matchId: _matchObject._id,

          })

          return userEvent.save()
            .then((err) => {
              if (err) {
                console.warn("Error when adding userEvent: " + err)
              } else {
                console.warn("Successfuly add userEvent")
              }
            })
        }
      }))
  })

  return Promise.all(promises)
}


exports.reInitEuroPoints = () => {
  User.find({}).exec((err, users) => {
    if (err) {
      res.render("error", {
        status: 500,
      })
    } else {
      _.each(users, (user) => {
        user.euroPoints = 0
        user.save((err) => {
          if (err) {
            console.warn("error when trying to save user")
          } else {
            console.warn("user saved")
          }
        })
      })
    }
  })

  Match.find({}).exec((err, matchs) => {
    if (err) {
      res.render("error", {
        status: 500,
      })
    } else {
      _.each(matchs, (match) => {
        match.scoresUpdated = undefined
        match.save((err) => {
          if (err) {
            console.warn("error when trying to save match")
          } else {
            console.warn("match saved")
          }
        })
      })
    }
  })
}

exports.updateMatch = (req, res) => {
  let match = req.match
  match = _.extend(match, req.body)
  match.save((err) => {
    console.warn(err)
    if (err) {
      console.log("Error when trying to save match: " + err)
    }

    if (match.scoreHome !== undefined && match.scoreAway !== undefined) {
      updateUserScores()
    }

    res.send(match)
  })
}
