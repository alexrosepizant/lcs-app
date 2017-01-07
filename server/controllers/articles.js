"use strict"

/**
* Module dependencies.
*/
const path = require("path")
const mongoose = require("mongoose")
const config = require("../config")
const Files = require("./files")

const Article = mongoose.model("Article")
const userFields = "_id username avatar"

/**
* Find article by id
*/
exports.article = (id) => {
  return Article.findById(id)
    .populate("user", userFields)
    .populate("comments.user", userFields)
    .populate("comments.replies.user", userFields)
}

/**
 * Count articles
 */
exports.count = () => {
  return Article.count({})
  .then((count, err) => {
    if (err) {
      return Promise.reject(err)
    } else {
      return count
    }
  })
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
    query.word = new RegExp(params.search, "i")
  }

  const limit = (params.perPage) ? parseInt(params.perPage) : (params.limit) ? parseInt(params.limit) : 25
  const skip = (params.page) ? parseInt(params.page * limit) : 0

  return Article.find(query)
    .sort("-created")
    .populate("user", userFields)
    .populate({
      path: "comments.user",
      select: userFields,
      options: {limit: 5},
    })
    .limit(limit)
    .skip(skip)
}

/**
* Create a article
*/
exports.create = (articleData) => {
  const article = new Article(articleData)

  if (article.type === "video" && !article.isEmbed) {
    const oldPath = path.resolve(config.root + "/server" + config.publicDirectory + article.url)
    const newPath = path.resolve(config.root + "/server" + config.publicDirectory
    + config.userVideoDirectory + article.url.split("/").pop())
    return Files.rename(oldPath, newPath)
      .then(() => {
        article.url = config.userVideoDirectory + article.url.split("/").pop()
        return article.save()
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  } else {
    return article.save()
  }
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
