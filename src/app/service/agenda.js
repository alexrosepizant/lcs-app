export default function AgendaFactory($http, UserEvent) {
  "ngInject"

  const BASE_URL = "userEvent"

  return {
    findOnGoingUserEvents() {
      return $http.get(`/${BASE_URL}`,{
        params: {
          ongoing: true,
        },
      }).then((userEvents) => {
        return userEvents.data.map((userEvent) => {
          return new UserEvent(userEvent)
        })
      })
    },

    findPastUserEvents() {
      return $http.get(`/${BASE_URL}`, {
        params: {
          past: true,
        },
      }).then((userEvents) => {
        return userEvents.data.map((userEvent) => {
          return new UserEvent(userEvent)
        })
      })
    },

    findUserEventsByUser(userId) {
      return $http.get(`/${BASE_URL}`, {
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
      return $http.get(`/${BASE_URL}/${userEventId}`)
        .then((response) => {
          return new UserEvent(response.data)
        })
    },

    createUserEvent(userEvent) {
      if (userEvent._id) {
        return this.update(userEvent)
      }
      return $http.post(`/${BASE_URL}`, userEvent)
    },

    update(userEvent) {
      return $http.put(`/${BASE_URL}/${userEvent._id}`, userEvent)
        .then((userEvent) => {
          return new UserEvent(userEvent.data)
        })
    },

    deleteUserEvent(userEventId) {
      return $http.delete(`/${BASE_URL}/${userEventId}`)
    },
  }
}
