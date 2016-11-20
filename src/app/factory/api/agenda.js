export default function AgendaFactory($http, UserEvent) {
  return {
    findUserEvents() {
      return $http.get("/userEvent")
        .then((userEvents) => {
          return userEvents.data.map((userEvent) => {
            return new UserEvent(userEvent)
          })
        })
    },

    getUserEvent(userEventId) {
      return $http.get(`/userEvent/${userEventId}`)
        .then((userEvent) => {
          return new UserEvent(userEvent)
        })
    },

    createUserEvent(userEvent) {
      return $http.post("/userEvent", userEvent)
    },

    updateUserEvent(userEvent) {
      return $http.put(`/userEvent/${userEvent._id}`, userEvent)
    },

    deleteUserEvent(userEventId) {
      return $http.delete(`/userEvent/${userEventId}`)
    },
  }
}
