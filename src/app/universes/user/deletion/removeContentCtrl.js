export default function ProfileCtrl($rootScope, $scope, ArticleFactory, AgendaFactory, Notification, contentId, type) {
  // retrieve variables
  $scope.contentId = contentId
  $scope.contentType = type

  $scope.dismiss = () => {
    $scope.$dismiss()
  }

  $scope.removeContent = () => {
    let labelType= ""
    let promise = null
    switch ($scope.contentType) {
    case "agenda":
      labelType = "évènement"
      promise = AgendaFactory.deleteUserEvent($scope.contentId)
      break
    default:
      labelType = "article"
      promise = ArticleFactory.deleteArticle($scope.contentId)
      break
    }

    promise
      .then(() => {
        $scope.$close(true)
        $rootScope.$broadcast("updateUserContentList")
        Notification.success({
          title: "Success",
          message: `l'${labelType} supprimé avec succés`,
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
