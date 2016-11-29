export default function StandardDetailCtrl($rootScope, $scope, article) {
  // Init variables
  $scope.currentUser = $rootScope.currentUser
  $scope.article = article
}
