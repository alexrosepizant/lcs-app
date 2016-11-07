export default function SignupCtrl($rootScope, $scope, AuthFactory, $location) {

  $scope.register = function() {
    AuthFactory.createUser({
      email: $scope.user.email,
      username: $scope.user.username,
      password: $scope.user.password,
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
