export default function IdeaFactory($http) {
  return {
    loadIdeas($scope) {
      $http.get("/idea")
        .then((ideas) => {
          $scope.ideas = ideas
        })
    },

    getIdea($scope, ideaId) {
      $http.get(`/idea/${ideaId}`)
        .then((idea) => {
          $scope.idea = idea
        })
    },

    createIdea($scope, idea) {
      $http.post("/idea", idea)
        .then((idea) => {
          $scope.idea = idea
        })
    },

    updateIdea($scope, idea) {
      $http.put(`/idea/${idea._id}`, idea)
        .then(() => {
          console.log("Idea succefully updated")
        })
    },

    deleteIdea($scope, idea) {
      $http.delete(`/idea/${idea._id}`)
        .then(() => {
          console.log("Idea succefully deleted")
        })
    },
  }
}
