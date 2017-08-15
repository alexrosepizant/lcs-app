export default function ChatFactory($http, Message) {
  "ngInject"

  const BASE_URL = "lcs-api/chat"

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
