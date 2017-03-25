export default function EuroRankCtrl($rootScope, $scope, MatchFactory, match) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.MatchFactory = MatchFactory
  $scope.match = match

  // Order bets
  $scope.match.bets.sort((a, b) => b.userPoints - a.userPoints)
}
