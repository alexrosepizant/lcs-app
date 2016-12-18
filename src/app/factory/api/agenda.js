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

    findUserEventsByUser(userId) {
      return $http.get("/userEvent", {
        params: {
          userId: userId,
        },
      }).then((userEvents) => {
        return userEvents.data.map((userEvent) => {
          return new UserEvent(userEvent)
        })
      })
    },

    findOne(userEventId) {
      return $http.get(`/userEvent/${userEventId}`)
        .then((response) => {
          return new UserEvent(response.data)
        })
    },

    createUserEvent(userEvent) {
      if (userEvent._id) {
        return this.update(userEvent)
      }
      return $http.post("/userEvent", userEvent)
    },

    update(userEvent) {
      return $http.put(`/userEvent/${userEvent._id}`, userEvent)
        .then((userEvent) => {
          return new UserEvent(userEvent.data)
        })
    },

    deleteUserEvent(userEventId) {
      return $http.delete(`/userEvent/${userEventId}`)
    },
  }
}
