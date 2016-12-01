export default function HomeCtrl($rootScope, $scope, datas) {
  // Retrieve params
  $scope.datas = datas
  $scope.article = datas.article
}
