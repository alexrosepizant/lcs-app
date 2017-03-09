export default function IdeaFactory($http, Idea) {
  "ngInject"

  return {
    loadIdeas() {
      return $http.get("/idea")
        .then((response) => {
          return response.data.map((idea) => new Idea(idea))
        })
    },

    getIdea(ideaId) {
      return $http.get(`/idea/${ideaId}`)
        .then((response) => {
          return new Idea(response.data)
        })
    },

    createIdea(idea) {
      return $http.post("/idea", idea)
    },

    updateIdea(idea) {
      return $http.put(`/idea/${idea._id}`, idea)
    },

    deleteIdea(ideaId) {
      return $http.delete(`/idea/${ideaId}`)
    },
  }
}
