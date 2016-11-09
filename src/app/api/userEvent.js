export default function UserEventFactory($http) {
  return {
    getUserEvents($scope) {
      $http.get("/userEvents")
        .then((userEvents) => {
          $scope.userEvents = userEvents
        })
    },

    getUserEvent($scope, userEventId) {
      $http.get(`/userEvents/${userEventId}`)
        .then((userEvent) => {
          $scope.userEvent = userEvent
        })
    },

    createUserEvent($scope, userEvent) {
      $http.post("/userEvents", userEvent)
        .then((userEvent) => {
          $scope.userEvent = userEvent
        })
    },

    updateUserEvent($scope, userEvent) {
      $http.put(`/userEvents/${userEvent._id}`, userEvent)
        .then(() => {
          console.warn("UserEvent succefully updated")
        })
    },

    deleteUserEvent($scope, userEvent) {
      $http.delete(`/userEvents/${userEvent._id}`)
        .then(() => {
          console.log("UserEvent succefully deleted")
        })
    },
  }
}
