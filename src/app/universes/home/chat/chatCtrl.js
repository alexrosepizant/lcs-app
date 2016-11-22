export default function HomeCtrl($rootScope, $scope, User, Message, socket, users, messages) {

  // Retrieve currentUser
  $scope.currentUser = $rootScope.currentUser

  // Retrieve others params and init
  $scope.users = users
  $scope.messages = messages

  $scope.connectedUsers = []
  $scope.message = {
    content: "",
    username: $scope.currentUser.username,
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
    $scope.addMessage(message)
  })

  socket.on("user:join", (data) => {
    $scope.connectedUsers = data.connectedUsers
    $scope.addMessage({
      username: "",
      content: data.username + " vient de rentrer.",
    })
  })

  socket.on("user:left", (data) => {
    $scope.connectedUsers = data.connectedUsers
    $scope.addMessage({
      username: "",
      content: data.username + " est partie.",
    })
  })

  /**
  Others events
  **/
  $scope.mention = (name) => {
    if ($scope.message.content.length > 0) {
      $scope.message.content += " "
    }
    $scope.message.content += "@" + name + " "
  }

  $scope.toggleChat = () => {
    $scope.showChat = !$scope.showChat
  }

  /**
  Add and save actions
  **/
  $scope.addMessage = (message) => {
    $scope.messages.push(new Message(message))
  }

  $scope.sendMessage = () => {
    if ($scope.message.content.length > 0) {
      $scope.addMessage($scope.message)
      socket.emit("send:message", $scope.message)

      // Reset content value
      $scope.message.content = ""
    }
  }
}
