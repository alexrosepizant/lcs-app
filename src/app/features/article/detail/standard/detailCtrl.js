export default function StandardDetailCtrl($rootScope, $scope, $state, $uibModal, ArticleFactory, article) {
  "ngInject"

  // Init variables
  $scope.currentUser = $rootScope.currentUser
  $scope.article = article

  /** *
    Article update and delete
  ***/
  $scope.updateContent = () => {
    $state.go("article.update", {articleId: $scope.article._id})
  }

  $scope.removeContent = () => {
    $uibModal.open({
      templateUrl: "app/features/user/deletion/removeContent.html",
      controller: "RemoveContentCtrl",
      resolve: {
        contentId: () => {
          return $scope.article._id
        },
        type: () => {
          return "standard"
        },
      },
    })
  }
}
