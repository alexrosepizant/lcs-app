const mongoose = require("mongoose")

const Chat = mongoose.model("Chat")

// Keep track of which names are used so that there are no duplicates
const userNames = (() => {
  return {
    names : [],
    add(username) {
      this.names.push(username)
    },
    remove(username) {
      const index = this.names.indexOf(username)
      if (index > -1) {
        this.names.splice(index, 1)
      }
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
  let username

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
    username = data.username
    userNames.add(username)

    socket.broadcast.emit("user:join", {
      username: username,
      connectedUsers: userNames.get(),
    })
  })

  // clean up when a user leaves, and broadcast it to other users
  socket.on("disconnect", () => {
    userNames.remove(username)

    socket.broadcast.emit("user:left", {
      username: username,
      connectedUsers: userNames.get(),
    })
  })
}
