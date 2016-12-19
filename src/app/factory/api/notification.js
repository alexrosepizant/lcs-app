export default function NotificationFactory($http, AppConstants, NotificationModel) {
  return {
    loadNotifications() {
      return $http.get("/notification", {
        limit: AppConstants.notificationCount,
      }).then((notifications) => {
        return notifications.data.map((notification) => {
          return new NotificationModel(notification)
        })
      })
    },

    loadNotificationsByUserId(userId) {
      return $http.get("/notification", {
        userId: userId,
        limit: AppConstants.notificationCount,
      }).then((notifications) => {
        return notifications.data.map((notification) => {
          return new NotificationModel(notification)
        })
      })
    },

    create(notification) {
      return $http.post("/notification", notification)
    },
  }
}
