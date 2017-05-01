export default function IdeaFactory($http, Idea) {
  "ngInject"

  const BASE_URL = "idea"

  return {
    loadIdeas() {
      return $http.get(`/${BASE_URL}`)
        .then((response) => {
          return response.data.map((idea) => new Idea(idea))
        })
    },

    getIdea(ideaId) {
      return $http.get(`/${BASE_URL}/${ideaId}`)
        .then((response) => {
          return new Idea(response.data)
        })
    },

    createIdea(idea) {
      return $http.post(`/${BASE_URL}`, idea)
    },

    updateIdea(idea) {
      return $http.put(`/${BASE_URL}/${idea._id}`, idea)
    },

    deleteIdea(ideaId) {
      return $http.delete(`/${BASE_URL}/${ideaId}`)
    },
  }
}
