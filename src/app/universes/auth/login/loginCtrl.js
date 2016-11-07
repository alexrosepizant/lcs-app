export default function LoginCtrl($rootScope, $scope, AuthFactory, $location) {

  $scope.login = function() {
    AuthFactory.login("password", {
      "email": $scope.user.email,
      "password": $scope.user.password,
    }).then((user) => {
      $rootScope.currentUser = user
      $location.path("/")
    }).catch((err) => {
      $scope.errors = {}
      angular.forEach(err.data.errors, function(error) {
        $scope.errors[error.path] = error.message
      })
    })
  }
}
