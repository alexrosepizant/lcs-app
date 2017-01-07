export default function ChatFactory($http, Message) {
  "ngInject"

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
