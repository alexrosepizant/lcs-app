export default function AgendaFactory($http, UserEvent) {
  return {
    loadUserEvents() {
      return $http.get("/userEvent")
        .then((userEvents) => {
          return userEvents.data.map((userEvent) => {
            return new UserEvent(userEvent)
          })
        })
    },

    getUserEvent($scope, userEventId) {
      return $http.get(`/userEvent/${userEventId}`)
        .then((userEvent) => {
          $scope.userEvent = userEvent
        })
    },

    createUserEvent(userEvent) {
      return $http.post("/userEvent", userEvent)
    },

    updateUserEvent($scope, userEvent) {
      return $http.put(`/userEvent/${userEvent._id}`, userEvent)
    },

    deleteUserEvent($scope, userEvent) {
      return $http.delete(`/userEvent/${userEvent._id}`)
    },
  }
}
