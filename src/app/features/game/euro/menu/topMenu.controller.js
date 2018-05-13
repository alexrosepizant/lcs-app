"use strict"

const DEFAULT_COMPETITION = "wc2018"
// MatchFactory
export default function TopMenuCtrl($scope) {
  "ngInject"

  this.$onInit = () => {
    $scope.competitionId = DEFAULT_COMPETITION
  }

  $scope.updateCompetition = function(competitionId) {
    $scope.competitionId = competitionId
  }
}
