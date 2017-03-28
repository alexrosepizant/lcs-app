export default function EuroMatchCtrl($rootScope, $scope, UserFactory, MatchFactory, users, matchs) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.MatchFactory = MatchFactory
  $scope.matchs = matchs
  $scope.users = users.sort((a,b) => b.euroPoints - a.euroPoints)

  $scope.updateBet = (match) => {
    match.updateBet()
    MatchFactory.update(match)
  }
}
