export default function HomeConfig($stateProvider) {
  $stateProvider
    .state("home", {
      url: "/home",
      template: require("./dashboard/home.html"),
      controller: "HomeCtrl",
      title: "Accueil",
      resolve: {
        notifications: (NotificationFactory) => {
          return NotificationFactory.loadNotifications()
        },
        // users: (UserFactory) => {
        //   return UserFactory.findUsers()
        // },
        article: (ArticleFactory) => {
          return ArticleFactory.getLastArticle()
        },
      },
    })
}
