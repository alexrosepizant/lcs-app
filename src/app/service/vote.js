export default function VoteFactory($http, Vote) {
  "ngInject"

  return {
    findVotes(filter) {
      return $http.get("/vote", {
        params: {
          "type": filter,
        },
      }).then((vote) => {
        return vote.data.map((vote) => new Vote(vote))
      })
    },

    getVote(voteId) {
      return $http.get(`/vote/${voteId}`)
        .then((vote) => {
          return new Vote(vote.data)
        })
    },

    createVote(vote) {
      if (vote._id) {
        return this.update(vote)
      }

      return $http.post("/vote", vote)
    },

    update(vote) {
      return $http.put(`/vote/${vote._id}`, vote)
        .then((response) => {
          return new Vote(response.data)
        })
    },

    deleteVote(voteId) {
      return $http.delete(`/vote/${voteId}`)
    },
  }
}
