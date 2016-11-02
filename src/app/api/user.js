export default function UserFactory($http) {

  function signin($scope) {
    $http.get("/signin").success((articles) => {
      $scope.articles = articles
    })
  }

  function signout($scope) {
    $http.get("/signout").success((articles) => {
      $scope.articles = articles
    })
  }

  function getUsers($scope) {
    $http.get("/users").success((article) => {
      $scope.article = article
    })
  }

  function getCurrentUser($scope) {
    $http.get("/users/me").success((user) => {
      $scope.user = user
    })
  }

  function getUser($scope, userId) {
    $http.get(`/users/${userId}`).success((user) => {
      $scope.user = user
    })
  }

  function createUser($scope, user) {
    $http.post("/users", user).success((user) => {
      $scope.user = user
    })
  }

  function updateUser($scope, user) {
    $http.put(`/users/${user._id}`, user).success(() => {
      console.log("User succefully updated")
    })
  }

  function deleteUser($scope, user) {
    $http.delete(`/users/${user._id}`).success(() => {
      console.log("User succefully deleted")
    })
  }

  return {
    signin,
    signout,
    getUsers,
    getCurrentUser,
    getUser,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  }
}
