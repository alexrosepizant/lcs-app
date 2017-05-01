export default function ChatFactory($http, Message) {
  "ngInject"

  const BASE_URL = "chat"

  return {
    findMessages() {
      return $http.get(`/${BASE_URL}`)
        .then((messages) => {
          return messages.data.map((message) => {
            return new Message(message)
          })
        })
    },
  }
}
