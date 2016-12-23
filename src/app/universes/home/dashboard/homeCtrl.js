export default function HomeCtrl($rootScope, $scope, notifications, article) {
  // Retrieve params
  $scope.notifications = notifications
  $scope.article = article

  // Format user presentations
  // $scope.presentations = users.map((user) => {
  //   return (user.presentation) ? user.username + ": " + user.presentation : null
  // }).filter((elt) => elt !== null).join(" - ")
}
