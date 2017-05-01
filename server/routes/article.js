"use strict"

// Articles routes use articles controller
const _ = require("lodash")
const articles = require("../controllers/article")
const notifications = require("../controllers/notification")
const mail = require("../controllers/mail")
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
  app.get("/article/count", (req, res) => {
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

  // CREATE: POST /article
  app.post("/article", authorization.requiresLogin, (req, res) => {
    articles.create(req.body)
      .then((article, err) => {
        if (err) {
          res.status(400).json(err)
        } else {
          // create notification
          notifications.create({
            title: article.title,
            contentId: article._id,
            type: article.type,
            user: article.user._id,
          })

          // send mail
          mail.sendToAll("articleMail", {
            subject : article.user.username + " a ajouté un article.",
            html : "Viens voir <b>" + article.title
              + "</b> en exclusivité sur les coqs soccer. "
              + "<b><a href='http://localhost:3000/#/blog/article/list'><br/><br/>"
              + "C'est par ici :)</a></b>",
          })

          res.jsonp(article)
        }
      })
  })

  // READ ALL: GET articles
  app.get("/article", (req, res) => {
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
  app.get("/article/:articleId", (req, res) => {
    res.jsonp(req.article)
  })

  // UPDATE: PUT articles/articleId
  app.put("/article/:articleId", authorization.requiresLogin, (req, res) => {
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
  app.delete("/article/:articleId", authorization.requiresLogin, (req, res) => {
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
