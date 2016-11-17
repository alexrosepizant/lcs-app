const mongoose = require("mongoose")

const Chat = mongoose.model("Chat")

module.exports = function(app) {
  app.get("/chat", function(req, res) {
    Chat.find()
    .sort("-created")
    .populate("user", "_id name username avatar")
    .limit(30)
    .exec()
    .then(function(messages, err) {
      if (err) {
        res.render("error", {
          status: 500,
          error: err,
        })
      } else {
        res.jsonp(messages)
      }
    })
  })
}
