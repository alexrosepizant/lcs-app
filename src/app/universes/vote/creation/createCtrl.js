export default function VoteCreationCtrl($rootScope, $scope, $location, VoteFactory, Notification) {

  $scope.showError = false
  $scope.vote = {
    title: "",
    content: "",
    yes: [],
    no: [],
    blank: [],
  }

  $scope.dismiss = function() {
    $scope.$dismiss()
  }

  $scope.create = function() {
    if (!$scope.vote.title) {
      return Notification.warning({
        title: "Info",
        message: "Mets au moins un titre",
      })
    }

    VoteFactory.createVote($scope)
      .then(() => {
        $rootScope.$broadcast("updateVoteList")
        $scope.$close(true)
        Notification.success({
          title: "Success",
          message: "Vote créé avec succés",
        })
      })
      .catch(() => {
        Notification.error({
          title: "Error",
          message: "Erreur lors de la création du vote",
        })
      })
  }
}
