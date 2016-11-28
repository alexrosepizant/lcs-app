export default function VoteListCtrl($scope, VoteFactory, votes, users, filter) {
  // Retrieve params
  $scope.votes = votes
  $scope.users = users
  $scope.filter = filter

  // Update vote list when add one
  $scope.$on("updateVoteList", () => {
    VoteFactory.findVotes("all")
      .then((votes) => $scope.votes = votes)
  })
}
