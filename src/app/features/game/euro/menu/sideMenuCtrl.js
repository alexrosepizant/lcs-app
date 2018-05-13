export default function SideMenuCtrl($rootScope, $scope, $location, $uibModal, $stateParams) {
  "ngInject"

  this.$onInit = () => {
    this.currentUser = $rootScope.currentUser
    this.competitionId = $stateParams.competitionId
  }

  this.showRules = () => {
    $uibModal.open({
      template : require("../rules/rules.html"),
      controller: "EuroRulesCtrl",
      backdrop: "static",
    })
  }
}
