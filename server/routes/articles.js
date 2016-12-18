"use strict"

// Articles routes use articles controller
const _ = require("lodash")
const articles = require("../controllers/articles")
const authorization = require("./middlewares/authorization")

module.exports = (app) => {

  // Setting up the articleId param
  app.param("articleId", (req, res, next, id) => {
    articles.article(id)
      .then((article, err) => {
        if (err) return next(err)
        req.article = article
        next()
      })
  })

  /**
   * Count articles
   */
  app.get("/articles/count", (req, res) => {
    articles.count()
      .then((count) => {
        res.jsonp(count)
      }).catch((err) => {
        res.status(400).json(err)
      })
  })

  /**
  CRUD endPoints
  **/

  // CREATE: POST /articles
  app.post("/articles", authorization.requiresLogin, (req, res) => {
    articles.create(req.body)
      .then((article, err) => {
        if (err) {
          res.status(400).json(err)
        } else {
          res.jsonp(article)
        }
      })
  })

  // READ ALL: GET articles
  app.get("/articles", (req, res) => {
    articles.all(req.query)
      .then((articles, err) => {
        if (err) {
          res.status(400).json(err)
        } else {
          res.jsonp(articles)
        }
      })
  })

  // READ ONE: GET articles/articleId
  app.get("/articles/:articleId", (req, res) => {
    res.jsonp(req.article)
  })

  // UPDATE: PUT articles/articleId
  app.put("/articles/:articleId", authorization.requiresLogin, (req, res) => {
    const article = _.extend(req.article, req.body)
    articles.update(article)
      .then((article, err) => {
        if (err) {
          res.status(400).json(err)
        } else {
          res.jsonp(article)
        }
      })
  })

  // DELETE: DELETE articles/articleId
  app.delete("/articles/:articleId", authorization.requiresLogin, (req, res) => {
    articles.destroy(req.article)
      .then((article, err) => {
        if (err) {
          res.status(400).json(err)
        } else {
          res.jsonp(article)
        }
      })
  })
}
