export default function MatchFactory($http) {

  function getMatchs($scope) {
    $http.get("/matchs").success((match) => {
      $scope.match = match
    })
  }

  function getMatch($scope, matchId) {
    $http.get(`/matchs/${matchId}`).success((match) => {
      $scope.match = match
    })
  }

  function createMatch($scope, match) {
    $http.post("/matchs", match).success((match) => {
      $scope.match = match
    })
  }

  function updateMatch($scope, match) {
    $http.put(`/matchs/${match._id}`, match).success(() => {
      getTasks($scope)
    })
  }

  function deleteMatch($scope, match) {
    $http.delete(`/matchs/${match._id}`).success(() => {
      console.log("Match succefully deleted")
    })
  }

  return {
    getMatchs,
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch,
  }
}
