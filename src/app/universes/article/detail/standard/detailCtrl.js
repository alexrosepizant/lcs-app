export default function StandardDetailCtrl($rootScope, $scope, ArticleFactory, article) {
  // Init variables
  $scope.currentUser = $rootScope.currentUser
  $scope.article = article
}
