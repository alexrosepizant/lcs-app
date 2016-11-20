export default function ChatFactory($http, Message) {
  return {
    findMessages() {
      return $http.get("/chat")
        .then((messages) => {
          return messages.data.map((message) => {
            return new Message(message)
          })
        })
    },
  }
}
