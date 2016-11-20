const mongoose = require("mongoose")

const Chat = mongoose.model("Chat")

// Keep track of which names are used so that there are no duplicates
const userNames = (() => {
  return {
    names : [],
    add(user) {
      this.names.push(user)
    },
    get() {
      const res = []
      this.names.forEach((user) => {
        res.push(user)
      })

      return res
    },
  }
})()

// export function for listening to the socket
module.exports = (socket) => {
  let name

  // send the new user their name and a list of users
  socket.emit("init", {
    connectedUsers: userNames.get(),
  })

  // broadcast a user's message to other users
  socket.on("send:message", (data) => {
    const newMsg = new Chat({
      username: data.username,
      content: data.content,
      created: new Date(),
    })
    newMsg.save(() => {
      socket.broadcast.emit("send:message", data)
    })
  })

  // notify other clients that a new user has joined
  socket.on("user:entry", (data) => {
    socket.broadcast.emit("user:join", data)

    name = data.username
    userNames.add(data)
  })

  // clean up when a user leaves, and broadcast it to other users
  socket.on("disconnect", () => {
    socket.broadcast.emit("user:left", {
      username: name,
    })
  })
}
