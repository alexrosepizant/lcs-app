export default function ProfileCtrl($rootScope, $scope, $state,
    ArticleFactory, AgendaFactory, Notification, contentId, type) {
  "ngInject"

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
      labelType = "Evènement"
      promise = AgendaFactory.deleteUserEvent($scope.contentId)
      break
    default:
      labelType = "Article"
      promise = ArticleFactory.deleteArticle($scope.contentId).then(() => {
        return $state.go("article")
      })
      break
    }

    promise
      .then(() => {
        $scope.$close(true)
        $rootScope.$broadcast("updateUserContentList")
        Notification.success({
          title: "Success",
          message: `${labelType} supprimé avec succés`,
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
