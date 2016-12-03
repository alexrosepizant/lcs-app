export default function SignupCtrl($rootScope, $scope, AuthFactory, $location, User) {
  $scope.register = function() {
    AuthFactory.createUser({
      email: $scope.user.email,
      username: $scope.user.username,
      password: $scope.user.password,
    }).then((user) => {
      $rootScope.user = new User(user)
      AuthFactory.authenticateUser()
    }).catch((err) => {
      $scope.errors = {}
      angular.forEach(err.data.errors, function(error) {
        $scope.errors[error.path] = error.message
      })
    })
  }
}
