export default function LoginCtrl($rootScope, $scope, AuthFactory) {

  $scope.login = function() {
    AuthFactory.login("password", {
      "email": $scope.user.email,
      "password": $scope.user.password,
    })
    .then(() => AuthFactory.authenticateUser())
    .catch((err) => {
      $scope.errors = {}
      angular.forEach(err.data.errors, function(error) {
        $scope.errors[error.path] = error.message
      })
    })
  }
}
