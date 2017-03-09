export default function VoteListCtrl($rootScope, $scope, VoteFactory, Vote, Notification, votes, users) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.votes = votes
  $scope.users = users
  $scope.options = {}

  $scope.votes.forEach((vote) => {
    if (vote.hasUserAnswered) {
      $scope.options[vote._id] = vote.getAnswerOfCurrentUser()
    }
  })

  $scope.addVote = (voteId) => {
    const vote = $scope.votes.find((vote) => vote._id === voteId)
    const answerId = $scope.options[voteId]

    vote.answers.find((item) => item._id === answerId).users.push($rootScope.currentUser._id)
    VoteFactory.updateVote(vote)
      .then(() => {
        vote.hasUserAnswered = true
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

  // Update vote list when add one
  $scope.$on("updateVoteList", () => {
    VoteFactory.findVotes("all")
    .then((votes) => {
      $scope.votes = votes.map((vote) => new Vote(vote))
    })
  })
}
