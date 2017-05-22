export class ChatCtrl {

  constructor($rootScope, $scope, Message, socket, UserFactory, ChatFactory) {
    "ngInject"

    this.$rootScope = $rootScope
    this.socket = socket
    this.Message = Message

    this.currentUser = $rootScope.currentUser

    // Retrieve others params and init
    UserFactory.findUsers()
      .then((users) => {
        this.users = users
      })

    ChatFactory.findMessages()
      .then((messages) => this.messages = messages)

    this.connectedUsers = []
    this.message = {
      content: "",
      username: this.currentUser.username,
    }

    /**
    Socket events
    **/
    socket.on("init", (data) => {
      this.connectedUsers = data.connectedUsers
      socket.emit("user:entry", {
        username: this.currentUser.username,
      })
    })

    socket.on("send:message", (message) => {
      this.addMessage(message)
    })

    socket.on("user:join", (data) => {
      this.connectedUsers = data.connectedUsers
      this.addMessage({
        username: "",
        content: data.username + " vient de rentrer.",
      })
      $rootScope.$broadcast("newMessage")
    })

    socket.on("user:left", (data) => {
      this.connectedUsers = data.connectedUsers
      this.addMessage({
        username: "",
        content: data.username + " est partie.",
      })
    })
  }

  /**
  Others events
  **/
  mention(name) {
    if (this.message.content.length > 0) {
      this.message.content += " "
    }
    this.message.content += "@" + name + " "
  }

  /**
  Add and save actions
  **/
  addMessage(message) {
    this.messages.unshift(new this.Message(message))
    this.$rootScope.$broadcast("onNewMessage")
    this.hasNewMessage = true
  }

  sendMessage() {
    if (this.message.content.length > 0) {
      this.addMessage(this.message)
      this.socket.emit("send:message", this.message)

      // Reset content value
      this.message.content = ""
      this.hasNewMessage = false
    }
  }
}
