export default function VoteFactory($http, Vote) {
  "ngInject"

  const BASE_URL = "lcs-api/vote"

  return {
    findVotes(filter) {
      return $http.get(`/${BASE_URL}`, {
        params: {
          "type": filter,
        },
      }).then((vote) => {
        return vote.data.map((vote) => new Vote(vote))
      })
    },

    getVote(voteId) {
      return $http.get(`/${BASE_URL}/${voteId}`)
        .then((vote) => {
          return new Vote(vote.data)
        })
    },

    createVote(vote) {
      if (vote._id) {
        return this.update(vote)
      }

      return $http.post(`/${BASE_URL}`, vote)
    },

    update(vote) {
      return $http.put(`/${BASE_URL}/${vote._id}`, vote)
        .then((response) => {
          return new Vote(response.data)
        })
    },

    deleteVote(voteId) {
      return $http.delete(`/${BASE_URL}/${voteId}`)
    },
  }
}
