export default function IssueFactory($http, Issue) {
  return {
    loadIssues() {
      return $http.get("/idea")
        .then((response) => {
          return response.data.map((idea) => new Issue(idea))
        })
    },

    getIssue(ideaId) {
      return $http.get(`/idea/${ideaId}`)
        .then((response) => {
          return new Issue(response.data)
        })
    },

    createIssue(idea) {
      return $http.post("/idea", idea)
    },

    updateIssue(idea) {
      return $http.put(`/idea/${idea._id}`, idea)
    },

    deleteIssue(ideaId) {
      return $http.delete(`/idea/${ideaId}`)
    },
  }
}
