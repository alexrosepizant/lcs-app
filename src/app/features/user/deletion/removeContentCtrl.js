export default function ProfileCtrl($rootScope, $scope, $state,
    ArticleFactory, AgendaFactory, VoteFactory, Notification, contentId, type) {
  "ngInject"

  // retrieve variables
  $scope.contentId = contentId
  $scope.contentType = type

  switch ($scope.contentType) {
  case "agenda":
    $scope.labelType = "l'evènement"
    break
  case "vote":
    $scope.labelType = "le vote"
    break
  default:
    $scope.labelType = "l'article"
    break
  }

  $scope.dismiss = () => {
    $scope.$dismiss()
  }

  $scope.removeContent = () => {
    let promise = null
    switch ($scope.contentType) {
    case "agenda":
      promise = AgendaFactory.deleteUserEvent($scope.contentId)
        .then(() => {
          $rootScope.$broadcast("updateAgendaList")
          return $state.go("agenda.view")
        })
      break
    case "vote":
      promise = VoteFactory.deleteVote($scope.contentId)
          .then(() => {
            $rootScope.$broadcast("updateVoteList")
            return $state.go("vote.view")
          })
      break
    default:
      promise = ArticleFactory.deleteArticle($scope.contentId)
        .then(() => {
          return $state.go("blog")
        })
      break
    }

    promise
      .then(() => {
        $scope.$close(true)
        $rootScope.$broadcast("updateUserContentList")
        Notification.success({
          title: "Success",
          message: `${$scope.labelType} supprimé avec succés`,
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
