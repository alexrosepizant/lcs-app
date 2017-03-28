export default function SideMenuCtrl($scope, $location, $uibModal) {
  "ngInject"

  $scope.isCurrentPath = (item) => {
    return $location.path().split("/").pop() === item
  }

  $scope.showRules = () => {
    $uibModal.open({
      template : require("../rules/rules.html"),
      controller: "EuroRulesCtrl",
      backdrop: "static",
    })
  }
}
