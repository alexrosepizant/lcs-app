export default function VoteFactory($http) {
  return {
    loadVotes($scope) {
      $http.get("/votes").then((votes) => {
        $scope.votes = votes
      })
    },

    getVote($scope, voteId) {
      $http.get(`/votes/${voteId}`).then((vote) => {
        $scope.vote = vote
      })
    },

    createVote($scope, vote) {
      $http.post("/votes", vote).then((vote) => {
        $scope.vote = vote
      })
    },

    updateVote($scope, vote) {
      $http.put(`/votes/${vote._id}`, vote).then(() => {
        console.log("Vote succefully updated")
      })
    },

    deleteVote($scope, vote) {
      $http.delete(`/votes/${vote._id}`).then(() => {
        console.log("Vote succefully deleted")
      })
    },
  }
}
