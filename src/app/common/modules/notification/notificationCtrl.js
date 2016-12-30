export default function NotificationCtrl($rootScope, $scope, NotificationFactory) {

  // Retrieve others params and init
  NotificationFactory.loadNotifications()
    .then((notifications) => $scope.notifications = notifications)
}
