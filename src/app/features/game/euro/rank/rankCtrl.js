export default function EuroRankCtrl($rootScope, $scope, users) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.users = users.sort((a,b) => b.euroPoints - a.euroPoints)
}
