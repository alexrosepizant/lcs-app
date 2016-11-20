export default function MatchFactory($http) {
  return {
    findMatchs($scope) {
      return $http.get("/matchs")
        .then((match) => {
          $scope.match = match
        })
    },

    getMatch(matchId) {
      return $http.get(`/matchs/${matchId}`)
        .then((match) => {
          return match
        })
    },

    createMatch(match) {
      return $http.post("/matchs", match)
    },

    updateMatch($scope, match) {
      return $http.put(`/matchs/${match._id}`, match)
    },

    deleteMatch($scope, match) {
      return $http.delete(`/matchs/${match._id}`)
    },
  }
}
