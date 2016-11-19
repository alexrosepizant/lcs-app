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
  })

  socket.on("send:message", (message) => {
    $scope.messages.unshift(new Message(message))
  })

  socket.on("user:join", (data) => {
    $scope.messages.unshift(new Message({
      user: "chatroom",
      content: data.user + " vient de rentrer.",
    }))
    // TODO : active user in list
  })

  // add a message to the conversation when a user disconnects or leaves the room
  socket.on("user:left", (data) => {
    $scope.messages.unshift(new Message({
      user: "chatroom",
      content: data.user + " est partie.",
    }))
  })

  $scope.mention = (name) => {
    if ($scope.message.content.length > 0) {
      $scope.message.content += " "
    }
    $scope.message.content += "@" + name + " "
  }

  $scope.sendMessage = () => {
    if ($scope.message.content.length === 0) {
      return
    }

    socket.emit("send:message", {
      userId: $scope.currentUser._id,
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
