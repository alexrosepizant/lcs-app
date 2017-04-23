export default function EuroRulesCtrl($rootScope, $scope) {
  "ngInject"

  $scope.dismiss = () => {
    $scope.$dismiss()
  }
}
