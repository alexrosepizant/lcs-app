export default function NotificationCtrl($rootScope, $scope, NotificationFactory) {
  "ngInject"

  // Retrieve others params and init
  NotificationFactory.loadNotifications()
    .then((notifications) => $scope.notifications = notifications)

  $scope.hideNotification = (notification) => {
    $scope.notifications = $scope.notifications.filter((item) => item._id !== notification._id)
  }
}
