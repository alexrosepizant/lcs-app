export default function SideMenuCtrl($rootScope, $scope, $location, $uibModal) {
  "ngInject"

  $scope.currentUser = $rootScope.currentUser

  $scope.showRules = () => {
    $uibModal.open({
      template : require("../rules/rules.html"),
      controller: "EuroRulesCtrl",
      backdrop: "static",
    })
  }
}
