export default function VoteListCtrl($scope, VoteFactory) {

  // Load data
  VoteFactory.loadVotes($scope)
}
