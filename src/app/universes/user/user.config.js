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
      },
    })
}
