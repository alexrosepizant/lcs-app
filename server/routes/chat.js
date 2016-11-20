const mongoose = require("mongoose")

const Chat = mongoose.model("Chat")

module.exports = (app) => {
  app.get("/chat", (req, res) => {
    Chat.find()
    .sort("-created")
    .populate("user", "_id name username avatar")
    .limit(30)
    .then((messages, err) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.jsonp(messages)
      }
    })
  })
}
