export default function VoteFactory($http) {

  function getVotes($scope) {
    $http.get("/votes").success((votes) => {
      $scope.votes = votes
    })
  }

  function getVote($scope, voteId) {
    $http.get(`/votes/${voteId}`).success((vote) => {
      $scope.vote = vote
    })
  }

  function createVote($scope, vote) {
    $http.post("/votes", vote).success((vote) => {
      $scope.vote = vote
    })
  }

  function updateVote($scope, vote) {
    $http.put(`/votes/${vote._id}`, vote).success(() => {
      getTasks($scope)
    })
  }

  function deleteVote($scope, vote) {
    $http.delete(`/votes/${vote._id}`).success(() => {
      console.log("Vote succefully deleted")
    })
  }

  return {
    getVotes,
    getVote,
    createVote,
    updateVote,
    deleteVote,
  }
}
