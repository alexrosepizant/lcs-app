import moment from "moment"

export default function VoteCreationCtrl($rootScope, $scope, $location, VoteFactory, Notification) {

  // Retrieve params
  $scope.vote = {
    title: "",
    content: "",
    yes: [],
    no: [],
    blank: [],
  }

  /**
  Flatpick config
  **/
  $scope.dateOpts = {
    utc: true,
    minDate: moment().add(1, "weeks").toString(),
    altInput: true,
    altFormat: "j F Y",
  }

  $scope.dismiss = function() {
    $scope.$dismiss()
  }

  $scope.create = function() {
    if (!$scope.vote.content || !$scope.vote.endsAt) {
      return Notification.warning({
        title: "Info",
        message: "Il faut un contenu et une date de fin!",
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
