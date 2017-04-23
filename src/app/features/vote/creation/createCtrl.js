export default function VoteCreationCtrl($rootScope, $scope, $location, VoteFactory, Notification, vote) {
  "ngInject"

  // Retrieve params
  $scope.vote = vote

  /**
  Flatpick config
  **/
  $scope.dateOpts = {
    utc: true,
    minDate: Date.now(),
    altInput: true,
    altFormat: "j F Y",
    defaultDate: vote.endsAt,
  }

  $scope.addItem = () => {
    $scope.vote.answers.push({
      content:"",
      users: [],
    })
  }

  $scope.dismiss = () => {
    $scope.$dismiss()
  }

  $scope.create = () => {
    if (!$scope.vote.content || !$scope.vote.endsAt) {
      return Notification.warning({
        title: "Info",
        message: "Il faut un contenu et une date de fin!",
      })
    }

    if ($scope.vote.answers.length < 2) {
      return Notification.warning({
        title: "Info",
        message: "Il faut au moins 2 propositions, dictateur va!",
      })
    }

    for (const answer of $scope.vote.answers) {
      if (answer.content === "") {
        return Notification.warning({
          title: "Info",
          message: "Tu as laissé une proposition vide",
        })
      }
    }

    VoteFactory.createVote($scope.vote)
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
