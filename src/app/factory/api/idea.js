export default function IdeaFactory($http) {
  return {
    loadIdeas($scope) {
      return $http.get("/idea")
        .then((ideas) => {
          return $scope.ideas = ideas
        })
    },

    getIdea(ideaId) {
      return $http.get(`/idea/${ideaId}`)
        .then((idea) => {
          return idea
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
