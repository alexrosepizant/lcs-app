"use strict"

/**
 * Module dependencies.
 */
const mongoose = require("mongoose")

const Article = mongoose.model("Article")
const UserEvent = mongoose.model("UserEvent")
const User = mongoose.model("User")
const Vote = mongoose.model("Vote")
const Comment = mongoose.model("Comment")
const  _ = require("lodash")


const formatUserData = function(userData) {

  const formattedDatas = {
    content: [],
  }

  const sortedDatas = {
    content: [],
  }

  _.each(userData.articles, function(article) {
    formattedDatas.content.push(article)
  })

  _.each(userData.comments, function(comment) {
    formattedDatas.content.push(_.defaults({
      type: "comment",
    }, comment._doc))
  })

  _.each(userData.userEvents, function(userEvent) {
    if (userEvent._doc.subType !== "euroMatch") {
      formattedDatas.content.push(_.defaults({
        type: "userEvent",
      }, userEvent._doc))
    }
  })

  _.each(userData.suggestions, function(suggestion) {
    formattedDatas.content.push(_.defaults({
      type: "suggestion",
    }, suggestion._doc))
  })

  sortedDatas.content = _.sortBy(formattedDatas.content, function(item) {
    return item.created || item.startsAt
  })

  return sortedDatas.content.slice(Math.max(sortedDatas.content.length - 31, 0), sortedDatas.content.length)
}

/**
 * User data
 */
exports.getAllUserData = function(req, res) {

  const query = (req.query.userId) ? {
    user: req.query.userId,
  } : {}

  const userData = {
    articles: [],
    userEvents: [],
    suggestions: [],
    comments: [],
  }

  const responseObject = {
    article: null,
    userEvents: null,
    votes: null,
    content: [],
    users: [],
  }

  Article.find(query, "-comments -yes -no -blank")
		.sort("-created")
    .limit(30)
		.populate("user", "_id name username avatar")
    .populate("comments.user", "_id name username avatar")
    .populate("comments.replies.user", "_id name username avatar").exec()
		.then(function(articles, err) {
  if (err) {
    res.render("error", {
      status: 500,
    })
  } else {
    responseObject.article = articles[0]
    userData.articles = articles
    return UserEvent.find(query, "-comments")
					.sort("-created")
          .limit(30)
					.populate("user", "_id name username avatar").exec()
  }
}).then(function(userEvent, err) {
  if (err) {
    res.render("error", {
      status: 500,
    })
  } else {
    responseObject.userEvents = userEvent
    userData.userEvents = userEvent
    return Vote.find(query)
					.sort("-created")
          .limit(30)
					.populate("user", "_id name username avatar").exec()
  }
}).then(function(votes, err) {
  if (err) {
    res.render("error", {
      status: 500,
    })
  } else {
    responseObject.votes = votes
    userData.votes = votes
    return User.find({},
      "-password -salt -hashed_password -__v -provider -readAlbums -readArticles -readVotes -conversations")
      .exec()
  }
}).then(function(users, err) {
  if (err) {
    res.render("error", {
      status: 500,
    })
  } else {
    responseObject.users = users
    return Comment.find({}).populate("user", "_id name username avatar").exec()
  }
}).then(function(comments, err) {
  if (err) {
    res.render("error", {
      status: 500,
    })
  } else {
    if (!req.query.userId) {
      userData.comments = comments
    }
    responseObject.content = formatUserData(userData)
    res.jsonp(responseObject)
  }
})
}
