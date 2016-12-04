export default function UserConfig($stateProvider) {
  $stateProvider
    .state("profile", {
      url: "/profile",
      template: require("./profile/profile.html"),
      controller: "ProfileCtrl",
      title: "Profile",
      resolve: {
        articles: ($rootScope, AuthFactory, ArticleFactory) => {
          return AuthFactory.updateCurrentUser()
           .then(() => {
             return ArticleFactory.getArticlesByUser($rootScope.currentUser._id)
           })
        },
        user: ($rootScope, UserFactory, User) => {
          return UserFactory.getUser($rootScope.currentUser._id)
            .then((response) => new User(response.data))
        },
      },
    })
    .state("publication", {
      url: "/profile/publication",
      template: require("./profile/publication.html"),
      controller: "ProfileCtrl",
      title: "Profile",
      resolve: {
        articles: ($rootScope, AuthFactory, ArticleFactory) => {
          return AuthFactory.updateCurrentUser()
           .then(() => {
             return ArticleFactory.getArticlesByUser($rootScope.currentUser._id)
           })
        },
        user: ($rootScope, UserFactory, User) => {
          return UserFactory.getUser($rootScope.currentUser._id)
            .then((response) => new User(response.data))
        },
      },
    })
}
