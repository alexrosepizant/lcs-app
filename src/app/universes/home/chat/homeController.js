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
      username: $scope.currentUser.username,
    })
  })

  socket.on("send:message", (message) => {
    $scope.messages.unshift(new Message(message))
  })

  socket.on("user:join", (message) => {
    $scope.messages.unshift(new Message({
      username: "",
      content: message.username + " vient de rentrer.",
    }))
    // TODO : active user in list
  })

  // add a message to the conversation when a user disconnects or leaves the room
  socket.on("user:left", (data) => {
    $scope.messages.unshift(new Message({
      username: "",
      content: data.username + " est partie.",
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
      username: $scope.currentUser.username,
      content: $scope.message.content,
    })

    // add the message to our model locally
    $scope.messages.unshift(new Message({
      username: $scope.currentUser.username,
      content: $scope.message.content,
    }))

    // clear message box
    $scope.message.content = ""
  }
}
