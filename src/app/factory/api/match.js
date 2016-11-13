export default function MatchFactory($http) {
  return {
    getMatchs($scope) {
      $http.get("/matchs")
        .then((match) => {
          $scope.match = match
        })
    },

    getMatch($scope, matchId) {
      $http.get(`/matchs/${matchId}`)
        .then((match) => {
          $scope.match = match
        })
    },

    createMatch($scope, match) {
      $http.post("/matchs", match)
        .then((match) => {
          $scope.match = match
        })
    },

    updateMatch($scope, match) {
      $http.put(`/matchs/${match._id}`, match)
        .then(() => {
          getTasks($scope)
        })
    },

    deleteMatch($scope, match) {
      $http.delete(`/matchs/${match._id}`)
        .then(() => {
          console.log("Match succefully deleted")
        })
    },
  }
}
