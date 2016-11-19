export default function VoteListCtrl($scope, votes, users, filter) {
  // Retrieve params
  $scope.votes = votes
  $scope.users = users
  $scope.filter = filter
}
