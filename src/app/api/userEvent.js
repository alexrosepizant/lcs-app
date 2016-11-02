export default function UserEventFactory($http) {

  function getUserEvents($scope) {
    $http.get("/userEvents").success((userEvents) => {
      $scope.userEvents = userEvents
    })
  }

  function getUserEvent($scope, userEventId) {
    $http.get(`/userEvents/${userEventId}`).success((userEvent) => {
      $scope.userEvent = userEvent
    })
  }

  function createUserEvent($scope, userEvent) {
    $http.post("/userEvents", userEvent).success((userEvent) => {
      $scope.userEvent = userEvent
    })
  }

  function updateUserEvent($scope, userEvent) {
    $http.put(`/userEvents/${userEvent._id}`, userEvent).success(() => {
      getTasks($scope)
    })
  }

  function deleteUserEvent($scope, userEvent) {
    $http.delete(`/userEvents/${userEvent._id}`).success(() => {
      console.log("UserEvent succefully deleted")
    })
  }

  return {
    getUserEvents,
    getUserEvent,
    createUserEvent,
    updateUserEvent,
    deleteUserEvent,
  }
}
