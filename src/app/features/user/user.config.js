export default function UserConfig($stateProvider) {
  "ngInject"

  $stateProvider
    .state("profile", {
      url: "/profile",
      template: require("./profile/profile.html"),
      controller: "ProfileCtrl",
      title: "Profile",
      resolve: {
        articles: ($rootScope, ArticleFactory) => {
          return ArticleFactory.getArticlesByUser($rootScope.currentUser._id)
        },
        userEvents: ($rootScope, AgendaFactory) => {
          return AgendaFactory.findUserEventsByUser($rootScope.currentUser._id)
        },
        user: ($rootScope, UserFactory) => {
          return UserFactory.getUser($rootScope.currentUser._id)
        },
      },
    })
    .state("publication", {
      url: "/publication",
      template: require("./profile/publication.html"),
      controller: "ProfileCtrl",
      title: "Publications",
      resolve: {
        articles: ($rootScope, ArticleFactory) => {
          return ArticleFactory.getArticlesByUser($rootScope.currentUser._id)
        },
        userEvents: ($rootScope, AgendaFactory) => {
          return AgendaFactory.findUserEventsByUser($rootScope.currentUser._id)
        },
        user: ($rootScope, UserFactory, User) => {
          return UserFactory.getUser($rootScope.currentUser._id)
            .then((response) => new User(response.data))
        },
      },
    })
}
