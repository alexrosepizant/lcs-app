export default function HeaderCtrl($rootScope, $scope, $state, AuthFactory, ArticleFactory) {
  "ngInject"

  $scope.currentUser = $rootScope.currentUser
  $scope.$state = $state

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
    name: "Les paris",
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
    ArticleFactory.search($scope.word)
  }

  $scope.$on("newMessage", () => {
    $scope.hasNewMessage = true
  })

  // Logout action
  $scope.logout = () => {
    AuthFactory.logout()
  }
}
