export default function HomeCtrl($rootScope, $scope, datas, users) {
  // Retrieve params
  $scope.datas = datas
  $scope.article = datas.article

  // Format user presentations
  $scope.presentations = users.map((user) => {
    return (user.presentation) ? user.username + ": " + user.presentation : null
  }).filter((elt) => elt !== null).join(" - ")
}
