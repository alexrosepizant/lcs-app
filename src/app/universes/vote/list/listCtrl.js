export default function VoteListCtrl($rootScope, $scope, VoteFactory, Notification, votes, users, filter) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.votes = votes
  $scope.users = users
  $scope.filter = filter

  // correspondance values
  $scope.voteOptions = ["yes", "blank", "no"]

  $scope.addVote = (vote, value) => {
    if (vote.hasUserAnswered($scope.currentUser._id)) {

      Notification.warning({
        title: "Warning",
        message: "T'as déjà voté, pas le droit de changer.",
      })

    } else {

      vote[$scope.voteOptions[value-1]].push($scope.currentUser._id)
      VoteFactory.updateVote(vote)
        .then((updatedVote) => {
          vote = updatedVote
          Notification.success({
            title: "Success",
            message: "Vote bien pris en compte, en attente de dépouillement.",
          })
        })
        .catch(() => {
          Notification.error({
            title: "Error",
            message: "Erreur pendant le vote, reessaye...",
          })
        })
    }
  }

  // Update vote list when add one
  $scope.$on("updateVoteList", () => {
    VoteFactory.findVotes("all")
      .then((votes) => {
        $scope.votes = votes
      })
  })
}
