export default function AlbumDetailCtrl($rootScope, $scope, article) {
  // Init variables
  $scope.currentUser = $rootScope.currentUser
  $scope.article = article
}
