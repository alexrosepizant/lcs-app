"use strict"

/**
* Module dependencies.
*/
const mongoose = require("mongoose")

const Article = mongoose.model("Article")

/**
* Find article by id
*/
exports.article = (id) => {
  return Article.findOne({
    "_id": id,
  })
  .populate("user", "name username avatar")
  .populate("comments.user", "_id name username avatar")
  .populate("comments.replies.user", "_id name username avatar")
  .populate("yes.user", "name username avatar")
  .populate("no.user", "name username avatar")
  .populate("blank.user", "name username avatar")
}

/**
* List of articles
*/
exports.all = (params) => {
  const query = (params.userId) ? {user: params.userId} : {}

  if (params.type && params.type !== "all") {
    query.type = params.type
  }

  if (params.categories) {
    query.categories = params.categories
  }

  if (params.search) {
    query.word = new RegExp(req.body.search, "i")
  }

  return Article.find(query)
    .sort("-created")
    .populate("user", "_id name username avatar")
    .populate("comments.user", "_id name username avatar")
    .populate("comments.replies.user", "_id name username avatar")
    .limit(20)
}

/**
* Create a article
*/
exports.create = (articleData) => {
  const article = new Article(articleData)
  return article.save()
}

/**
* Update a article
*/
exports.update = (article) => {
  return article.save()
}

/**
* Delete an article
*/
exports.destroy = (article) => {
  return article.remove()
}
