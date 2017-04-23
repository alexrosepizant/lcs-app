"use strict"

const mongoose = require("mongoose")

const Match = mongoose.model("Match")
const User = mongoose.model("User")
const UserEvent = mongoose.model("UserEvent")
const userFields = "_id name username avatar"

exports.match = (matchId) => {
  return Match.findById(matchId)
    .populate("bets.user", userFields)
    .populate("comments.user", userFields)
    .populate("comments.replies.user", userFields)
}

exports.all = (params) => {
  const endedMatch = (params.endedMatch === "true")
  const query = (endedMatch) ? {
    startsAt: {
      "$lt": new Date(),
    },
  } : {}

  return Match.find(query)
    .sort("startsAt")
    .populate("bets.user", userFields)
}

exports.create = (match) => {
  return new Match(match).save()
}

exports.update = (match) => {
  return match.save()
    .then((match) => this.match(match._id))
}

exports.delete = (match) => {
  return match.remove()
}

/*
Score calculation
*/
const getPointsFromMatch = (match, user) => {
  /* Winner code:
  1 for home team
  2 for away team
  -1 for nul score
  */

  const GOOD_SCORE = 5
  const GOOD_WINNER = 2
  const ACCEPTED_GOAL_DIFFERENCE = 1

  let points = 0
  const userBet = match.bets.find((bet) => bet.user._id === user._id)

  if (!userBet) {
    return 0
  }

  // Get real match results
  const scoreHome = match.scoreHome
  const scoreAway = match.scoreAway
  const winner = (scoreHome > scoreAway) ? 1 : ((scoreHome < scoreAway) ? 2 : -1)
  const goalDifference = scoreHome - scoreAway

  // Get bet pronosctics
  const userScoreHome = userBet.homeScore
  const userScoreAway = userBet.awayScore
  const userWinner = (userScoreHome > userScoreAway) ? 1 : ((userScoreHome < userScoreAway) ? 2 : -1)
  const userGoalDifference = userScoreHome - userScoreAway

  // Apply points
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

  if (match.type === "SF") {
    return points * 2
  }

  if (match.type === "FINALE") {
    return points * 3
  }

  return points
}

/*
  Calcul score for each bet of giving match
*/
const updateBets = (match) => {
  match.bets.forEach((bet) => {
    bet.userPoints = getPointsFromMatch(match, bet.user)
  })
  return match
}

const cleanMatch = (match) => {
  const bets = []
  const users = []

  match.bets.reverse().forEach((bet) => {
    if (!users.includes(bet.user._id)) {
      bets.push(match.bets.find((_bet) => _bet.user._id === bet.user._id))
      users.push(bet.user._id)
    }
  })

  match.bets = bets
  return match
}

const updateUserBet = (match) => {
  const promises = []
  match.bets.forEach((bet) => {
    const points = getPointsFromMatch(match, bet.user)

    console.warn(bet.user.username + " scored " + points)
    promises.push(User.findByIdAndUpdate(bet.user._id, {
      $inc: {
        euroPoints: points,
      }}, {
        upsert: true,
      })
    )
  })

  return promises
}

/*
  Calcul and store scores for each ended match
*/
const updateScores = () => {
  let promises = []

  return Match.find({
    startsAt: {
      "$lt": new Date(),
    },
    $and: [
      {
        $or:[
          {scoresUpdated: false},
          {scoresUpdated: {$exists:false}},
        ],
      },
    ],
  })
  .populate("bets.user", userFields)
  .then((matchs, err) => {
    if (err) {
      console.warn("Error when trying to fetch matchs: " + err)
    } else {
      console.warn("Count of matchs to udpate: " + matchs.length)
      matchs.forEach((match) => {

        if (Number.isInteger(match.scoreHome) && Number.isInteger(match.scoreAway)) {
          console.warn("")
          console.warn("------- New match ------")
          match = cleanMatch(match)
          match = updateBets(match)
          match.scoresUpdated = true
          promises.push(match.save())
          promises = promises.concat(updateUserBet(match))
        }
      })

      return Promise.all(promises)
    }
  })
}

/*
  Utils: mapping betwenn country code and name
*/
const getNameOfCountryCode = (teams, code) => {
  return teams.find((team) => team.code === code).name
}

/*
  Create a userEvent with match infos
*/
const createEventFromMatch = (EuroData, match, _matchObject) => {
  const teams = EuroData.teams
  const userEvent = new UserEvent({
    title: getNameOfCountryCode(teams, match.home) + " - " + getNameOfCountryCode(teams, match.away),
    content: "Match de l'euro 2016 du groupe " + match.type,
    startsAt: match.startsAt,
    endsAt: match.startsAt,
    subType: "euroMatch",
    matchId: _matchObject._id,
  })

  return userEvent.save()
}

/*
  Data load
*/
const loadMatchsFromJson = (EuroData) => {
  const promises = []

  EuroData.matchs
    .map((match) => new Match(match))
    .forEach((match) => {
      promises.push(match.save()
        .then((_matchObject, err) => {
          if (err) {
            console.warn("Error when adding match: " + err)
          }
          console.warn("Successfuly add match")
          return createEventFromMatch(EuroData, match, _matchObject)
        }))
    })

  return Promise.all(promises)
}

/*
  RESET user data relative to euro game
*/
const resetUserEuroPoints = () => {
  return User.update({}, {
    $set: {
      euroPoints: 0,
    },
  }, {
    multi: true,
  }).then((affectedRows, err) => {
    if (err) {
      return Promise.reject(err)
    }
    console.warn("Count of updated users : " + affectedRows.n)
  })
}

/*
  RESET Matchs relative to euro game
*/
const resetMatchScores = () => {
  return Match.update({}, {
    $unset: {
      scoresUpdated: "",
    },
  }, {
    multi: true,
  }).then((affectedRows, err) => {
    if (err) {
      return Promise.reject(err)
    }
    console.warn("Count of updated matchs : ", affectedRows.n)
  })
}

const reInitEuroPoints = () => {
  return resetUserEuroPoints()
    .then(() => {
      return resetMatchScores()
    })
    .catch((err) => console.error(err))
}

exports.update = (match) => {
  return match.save()
    .then((match) => {
      updateScores()
      return match
    })
    .then((match) => this.match(match._id))
}

exports.updateScores = updateScores
exports.loadMatchsFromJson = loadMatchsFromJson
exports.reInitEuroPoints = reInitEuroPoints
