export default function HomeCtrl($rootScope, $scope, User, Message, socket, users, messages) {

  // Retrieve currentUser
  $scope.currentUser = $rootScope.currentUser

  // Retrieve others params
  $scope.users = users
  $scope.messages = messages
  $scope.message = {
    content: "",
  }

  /**
  Socket events
  **/
  socket.on("init", (data) => {
    $scope.connectedUsers = data.connectedUsers

    socket.emit("user:entry", {
      userId: $scope.currentUser._id,
      username: $scope.currentUser.username,
    })
  })

  socket.on("send:message", (message) => {
    $scope.messages.unshift(new Message({
      user: {
        username: message.username,
        _id: message.userId,
      },
      content: message.content,
    }))
  })

  socket.on("user:join", (message) => {
    $scope.messages.unshift(new Message({
      user: {
        _id: message.userId,
        username: message.username,
      },
      content: message.username + " vient de rentrer.",
    }))
    // TODO : active user in list
  })

  // add a message to the conversation when a user disconnects or leaves the room
  socket.on("user:left", (data) => {
    $scope.messages.unshift(new Message({
      user: {
        username: data.username,
      },
      content: data.user + " est partie.",
    }))
  })

  $scope.mention = (name) => {
    if ($scope.message.content.length > 0) {
      $scope.message.content += " "
    }
    $scope.message.content += "@" + name + " "
  }

  $scope.displayNewMessage = (user, content) => {
    $scope.messages.unshift(new Message({
      user: user,
      content: content,
    }))
  }

  $scope.sendMessage = () => {
    if ($scope.message.content.length === 0) {
      return
    }

    socket.emit("send:message", {
      userId: $scope.currentUser._id,
      username: $scope.currentUser.username,
      content: $scope.message.content,
    })

    // add the message to our model locally
    $scope.messages.unshift(new Message({
      user: $scope.currentUser,
      content: $scope.message.content,
    }))

    // clear message box
    $scope.message.content = ""
  }
}
