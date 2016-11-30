export default function ProfileCtrl($rootScope, $scope, ArticleFactory, Notification, articleId) {
  // retrieve variables
  $scope.articleId = articleId

  $scope.dismiss = () => {
    $scope.dismiss()
  }

  $scope.removeContent = () => {
    ArticleFactory.deleteArticle($scope.articleId)
      .then(() => {
        $scope.$close(true)
        $rootScope.$broadcast("updateUserContentList")
        Notification.success({
          title: "Success",
          message: "Article supprimé avec succés",
        })
      })
      .catch((err) => {
        Notification.error({
          title: "Error",
          message: err,
        })
      })
  }
}
