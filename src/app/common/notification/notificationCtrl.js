export default function NotificationCtrl($rootScope, $scope, NotificationFactory) {
  "ngInject"

  // Retrieve others params and init
  NotificationFactory.loadNotifications()
    .then((notifications) => $scope.notifications = notifications)
}
