export default function EuroMatchCtrl($rootScope, $scope, UserFactory, MatchFactory, Notification, users, matchs) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.MatchFactory = MatchFactory
  $scope.matchs = matchs
  $scope.users = users.sort((a,b) => b.euroPoints - a.euroPoints)

  $scope.updateScore = (match) => {
    MatchFactory.update(match)
      .then(() => {
        Notification.info({
          title: "Info",
          message: "Score du match bien pris en compte",
        })
      })
  }
}
