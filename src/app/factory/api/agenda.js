export default function AgendaFactory($http) {
  return {
    loadUserEvents($scope) {
      $http.get("/userEvent")
        .then((userEvents) => {
          $scope.userEvents = userEvents
        })
    },

    getUserEvent($scope, userEventId) {
      $http.get(`/userEvent/${userEventId}`)
        .then((userEvent) => {
          $scope.userEvent = userEvent
        })
    },

    createUserEvent($scope, userEvent) {
      $http.post("/userEvent", userEvent)
        .then((userEvent) => {
          $scope.userEvent = userEvent
        })
    },

    updateUserEvent($scope, userEvent) {
      $http.put(`/userEvent/${userEvent._id}`, userEvent)
        .then(() => {
          console.warn("UserEvent succefully updated")
        })
    },

    deleteUserEvent($scope, userEvent) {
      $http.delete(`/userEvent/${userEvent._id}`)
        .then(() => {
          console.log("UserEvent succefully deleted")
        })
    },
  }
}
