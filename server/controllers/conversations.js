"use strict"

/**
 * Module dependencies.
 */
const mongoose = require("mongoose")

const Chat = mongoose.model("Chat")
const Conversation = mongoose.model("Conversation")
const _ = require("lodash")

exports.migrateConversation = () => {
  const promises = []

  return Conversation.findOne({users: []})
  .populate("messages.user", "username")
	.then((conversations, err) => {
  if (err) {
    return Promise.reject(err)
  } else {
    console.log(conversations.messages.length + " to migrate")
    _.each(conversations.messages, (message) => {
      if (message.content.length > 0) {

        const chat = new Chat({
          username: message.user.username,
          content: message.content,
          created: message.created,
        })

        promises.push(chat.save((err) => {
          if (err) {
            console.log("Error when trying to save new chat " + err)
          } else {
            console.log("Save new chat: " + chat.content)
          }
        }))
      }
    })

    return Promise.all(promises)
  }
})
}
