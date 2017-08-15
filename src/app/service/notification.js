export default function NotificationFactory($http, AppConstants, NotificationModel) {
  "ngInject"

  const BASE_URL = "lcs-api/notification"

  return {
    loadNotifications() {
      return $http.get(`/${BASE_URL}`, {
        params: {
          limit: AppConstants.notificationCount,
        },
      }).then((notifications) => {
        return notifications.data.map((notification) => {
          return new NotificationModel(notification)
        })
      })
    },

    loadNotificationsByUserId(userId) {
      return $http.get(`/${BASE_URL}`, {
        params: {
          userId: userId,
          limit: AppConstants.notificationCount,
        },
      }).then((notifications) => {
        return notifications.data.map((notification) => {
          return new NotificationModel(notification)
        })
      })
    },

    create(notification) {
      return $http.post(`/${BASE_URL}`, notification)
    },
  }
}
