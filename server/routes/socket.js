const mongoose = require("mongoose")

const Chat = mongoose.model("Chat")

// export function for listening to the socket
module.exports = function(socket) {
  const name = "Guest 1"

  // send the new user their name and a list of users
  socket.emit("init", {
    connectedUsers: [],
  })

  // notify other clients that a new user has joined
  socket.broadcast.emit("user:join", {
    user: name,
  })

  // broadcast a user's message to other users
  socket.on("send:message", function(data) {
    const newMsg = new Chat({
      user: data.userId,
      content: data.content,
      room: "",
      created: new Date(),
    })

    newMsg.save(function(err, msg) {
      socket.broadcast.emit("send:message", msg)
    })
  })

  // clean up when a user leaves, and broadcast it to other users
  socket.on("disconnect", function() {
    socket.broadcast.emit("user:left", {
      user: name,
    })
  })
}
