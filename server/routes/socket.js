const mongoose = require("mongoose")

const Chat = mongoose.model("Chat")

// Keep track of which names are used so that there are no duplicates
const userNames = (function() {
  return {
    names : [],
    add(user) {
      this.names.push(user)
    },
    get() {
      const res = []
      this.names.forEach(function(user) {
        res.push(user)
      })

      return res
    },
  }
}())

// export function for listening to the socket
module.exports = function(socket) {
  let name

  // send the new user their name and a list of users
  socket.emit("init", {
    connectedUsers: userNames.get(),
  })

  // broadcast a user's message to other users
  socket.on("send:message", function(data) {
    const newMsg = new Chat({
      userId: data.userId,
      username: data.username,
      content: data.content,
      created: new Date(),
    })

    newMsg.save(function(err, msg) {
      socket.broadcast.emit("send:message", msg)
    })
  })

  // notify other clients that a new user has joined
  socket.on("user:entry", function(data) {
    socket.broadcast.emit("user:join", {
      username: data.username,
      userId: data.userId,
    })

    name = data.username
    userNames.add(data)
  })

  // clean up when a user leaves, and broadcast it to other users
  socket.on("disconnect", function() {
    socket.broadcast.emit("user:left", {
      username: name,
    })
  })
}
