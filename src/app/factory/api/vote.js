export default function VoteFactory($http, Vote) {
  "ngInject"

  return {
    findVotes(filter) {
      return $http.get("/votes", {
        params: {
          "type": filter,
        },
      }).then((votes) => {
        return votes.data.map((vote) => {
          return new Vote(vote)
        })
      })
    },

    getVote(voteId) {
      return $http.get(`/votes/${voteId}`)
        .then((vote) => {
          return new Vote(vote)
        })
    },

    createVote($scope) {
      return $http.post("/votes", $scope.vote)
    },

    updateVote(vote) {
      return $http.put(`/votes/${vote._id}`, vote)
    },

    deleteVote(vote) {
      return $http.delete(`/votes/${vote._id}`)
    },
  }
}
