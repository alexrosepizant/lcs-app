export default function EuroListCtrl($rootScope, $scope, UserFactory, MatchFactory, users, matchs) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.MatchFactory = MatchFactory
  $scope.matchs = matchs
  $scope.users = users.sort((a,b) => b.euroPoints - a.euroPoints)

  $scope.selectTeam = (teamCode) => {
    $scope.currentUser.favoriteEuroTeam = teamCode
    UserFactory.updateUser($scope.currentUser)
  }

  $scope.updateBet = (match) => {
    match.updateBet()
    MatchFactory.update(match)
  }
}
