export default function StandardCreationCtrl($scope, ArticleFactory) {

  $scope.showError = false

  $scope.dismiss = function() {
    $scope.$dismiss()
  }

  $scope.create = function() {
    ArticleFactory.create($scope.article)
  }
}
