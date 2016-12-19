export default function HomeCtrl($rootScope, $scope, notifications, users) {
  // Retrieve params
  $scope.notifications = notifications

  // Format user presentations
  $scope.presentations = users.map((user) => {
    return (user.presentation) ? user.username + ": " + user.presentation : null
  }).filter((elt) => elt !== null).join(" - ")
}
