export default function HeaderCtrl($rootScope, $scope, AuthFactory, $location, Notification) {
  "ngInject"

  $scope.currentUser = $rootScope.currentUser
  $scope.hasNewMessage = true

  // Main menu
  $scope.menu = [{
    name: "A la une",
    link: "blog",
    routePath: "article",
  }, {
    name: "Les rencards",
    link: "agenda.view",
    routePath: "agenda",
  },
  {
    name: "L'isoloir",
    link: "vote.view",
    routePath: "vote",
  },
  {
    name: "Les jeux",
    link: "games.euro.team",
    routePath: "games.*.*",
  },
  {
    name: "Site / Bugs",
    link: "about.issue",
    routePath: "about",
  }]

  // Search
  $scope.search = () => {
    Notification.info({
      title: "Info",
      message: "C'est pour bientôt!",
    })
    $scope.word = ""
  }

  $scope.$on("newMessage", () => {
    $scope.hasNewMessage = true
  })

  // Logout action
  $scope.logout = () => {
    AuthFactory.logout()
  }
}
