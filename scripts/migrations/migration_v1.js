/**
* Global dependencies includes db models and routes.
*/
const mongoose = require("mongoose")
const _ = require("lodash")
const config = require("../../server/config")
const utils = require("../../server/utils")

// Bootstrap db connection
utils.bootstrapApp()
mongoose.Promise = global.Promise

/**
Define functions
**/
const Album = mongoose.model("Album")
const Article = mongoose.model("Article")
const Chat = mongoose.model("Chat")
const Conversation = mongoose.model("Conversation")
const Comment = mongoose.model("Comment")
const Notification = mongoose.model("Notification")
const UserEvent = mongoose.model("UserEvent")

const migrateAlbum = () => {
  const albumPromises = []
  return Album.find({})
  .then((albums, err) => {
    if (err) {
      return Promise.reject("Error when to fetch album " + err)
    } else {

      console.log(albums.length + " albums to migrate: ")
      _.each(albums, (album) => {
        const article = new Article({
          title: album.name,
          user: album.user,
          content: album.description,
          type: "album",
          comments: [],
          created: album.created,
          photoList: album.photoList,
          coverPicPath: album.coverPicPath,
          comments: album.comments,
        })

        albumPromises.push(article.save((err) => {
          if (err) {
            console.log("Error when trying to save new article " + err)
          } else {
            console.log("Save new article: " + article.title)
          }
        }))
      })

      return Promise.all(albumPromises)
    }
  })
}

const migrateConversation = () => {
  const conversationPromises = []
  return Conversation.findOne({users: []})
  .populate("messages.user", "username")
  .then((conversations, err) => {
    if (err) {
      return Promise.reject(err)
    } else {

      if (!conversations || !conversations.messages)  {
        console.log("No conversations to migrate")
        return Promise.resolve()
      }

      console.log(conversations.messages.length + " to migrate")
      _.each(conversations.messages, (message) => {
        if (message.content.length > 0) {

          const chat = new Chat({
            username: message.user.username,
            content: message.content,
            created: message.created,
          })

          conversationPromises.push(chat.save((err) => {
            if (err) {
              console.log("Error when trying to save new chat " + err)
            } else {
              console.log("Save new chat: " + chat.content)
            }
          }))
        }
      })

      return Promise.all(conversationPromises)
    }
  })
}

const migrateCategoriesArticles = () => {
  const articlePromises = []
  return Article.find({})
  .then((articles, err) => {
    if (err) {
      return Promise.reject(err)
    } else {

      console.log(articles.length + " to migrate")
      _.each(articles, (article) => {
        article.categories = article.categories.map((categorie) => {
          if (categorie.value) {
            return categorie.value
          } else {
            return categorie
          }
        })
        articlePromises.push(article.save((err) => {
          if (err) {
            console.log("Error when trying to update article " + err)
          } else {
            console.log("Update article: " + article.title)
          }
        }))
      })

      return Promise.all(articlePromises)
    }
  })
}

const migrateVideoArticles = () => {
  const articlePromises = []
  return Article.find({type: "video"})
  .then((articles, err) => {
    if (err) {
      return Promise.reject(err)
    } else {

      console.log(articles.length + " to migrate")
      _.each(articles, (article) => {
        article.url = article.videoLink
        article.isEmbed = true

        articlePromises.push(article.save((err) => {
          if (err) {
            console.log("Error when trying to update article " + err)
          } else {
            console.log("Update article: " + article.title)
          }
        }))
      })

      return Promise.all(articlePromises)
    }
  })
}

const changeQuoteToVote = () => {
  const articlePromises = []
  return Article.find({
    type: "quote",
  }).then((articles, err) => {
    if (articles.length === 0) {
      console.warn("Nothing to migrate")
      return Promise.resolve()
    }

    if (err) {
      console.warn("Error when trying to migrate suggestions articles")
      return Promise.resolve()
    }

    _.each(articles, (article) => {
      article.type = "vote"
      articlePromises.push(article.save((err) => {
        if (err) {
          console.warn("error when trying to save user")
        } else {
          console.warn("article updated")
        }
      }))
    })
    return Promise.all(articlePromises)
  })
}

const createNotificationFromScratch = () => {
  const promises = []
  return Article.find()
    .then((articles, err) => {
      if (err) {
        return Promise.reject(err)
      } else {
        console.log(articles.length + " notifications from articles")
        articles.forEach((article) => {
          const notification = new Notification({
            title: article.title,
            contentId: article._id,
            type: article.type,
            user: article.user,
            created: article.created,
          })
          promises.push(notification.save())
        })
        return UserEvent.find()
      }
    }).then((userEvents, err) => {
      if (err) {
        return Promise.reject(err)
      } else {
        console.log(userEvents.length + " notifications from userEvents")
        userEvents.forEach((userEvent) => {
          const notification = new Notification({
            title: userEvent.title,
            contentId: userEvent._id,
            type: "userEvent",
            user: userEvent.user,
            created: userEvent.created,
          })
          promises.push(notification.save())
        })
        return Comment.find()
      }
    }).then((comments, err) => {
      if (err) {
        return Promise.reject(err)
      } else {
        console.log(comments.length + " notifications from comments")
        comments.forEach((comment) => {
          const notification = new Notification({
            title: "",
            contentId: comment._id,
            type: "comment",
            user: comment.user,
            contentType: comment.contentType,
            created: comment.created,
          })
          promises.push(notification.save())
        })
        return Promise.all(promises)
      }
    })
}
/**
Execute Scripts
**/
mongoose.connect(config.db)
.then(() => {
  utils.titleLog("Start script migration...")
})
.then(() => {
  utils.titleLog("Prepare to migrate albums")
  return migrateAlbum()
})
.then(() => {
  utils.titleLog("Prepare to migrate suggestion articles")
  return changeQuoteToVote()
})
.then(() => {
  utils.titleLog("Prepare to migrate conversations")
  return migrateConversation()
})
.then(() => {
  utils.titleLog("Prepare to migrate categories articles")
  return migrateCategoriesArticles()
})
.then(() => {
  utils.titleLog("Prepare to migrate video articles")
  return migrateVideoArticles()
})
.then(() => {
  utils.titleLog("Prepare to create notifications")
  return createNotificationFromScratch()
})
.then(() => {
  utils.titleLog("Script migration ended")
  process.exit(-1)
})
.catch((err) => {
  utils.titleLog(err)
  process.exit(-1)
})
