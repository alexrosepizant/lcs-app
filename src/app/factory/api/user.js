export default function UserFactory($http) {
  return {
    getUsers($scope) {
      $http.get("/users")
        .then((article) => {
          $scope.article = article
        })
    },

    getCurrentUser($scope) {
      $http.get("/users/me")
        .then((user) => {
          $scope.user = user
        })
    },

    getUser($scope, userId) {
      $http.get(`/users/${userId}`)
        .then((user) => {
          $scope.user = user
        })
    },

    updateUser($scope, user) {
      $http.put(`/users/${user._id}`, user)
        .then(() => {
          console.log("User succefully updated")
        })
    },

    deleteUser($scope, user) {
      $http.delete(`/users/${user._id}`)
        .then(() => {
          console.log("User succefully deleted")
        })
    },
  }
}
