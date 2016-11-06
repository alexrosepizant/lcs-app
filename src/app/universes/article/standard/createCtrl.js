export default function StandardCreationCtrl($scope, ArticleFactory) {

  $scope.showError = false

  $scope.create = function() {
    ArticleFactory.create($scope.article)
  }
}
