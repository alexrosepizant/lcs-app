export default function HeaderCtrl($rootScope, $scope, AuthFactory, $location, Notification) {

  $scope.currentUser = $rootScope.currentUser

  // Main menu
  $scope.menu = [{
    name: "Articles",
    link: "article",
  }, {
    name: "Agenda",
    link: "agenda",
  //   name: "Recommendations",
  //   link: "recommendations",
  }, {
    name: "...",
    link: "about",
  }]

  $scope.isCurrentPath = (item) => {
    return $location.path().indexOf(item.link) !== -1
  }

  // Search
  $scope.search = () => {
    Notification.info({
      title: "Info",
      message: "C'est pour bientôt!",
    })
    $scope.word = ""
  }

  $scope.$on("onNewMessage", () => {
    $scope.showChat = true
  })

  // Logout action
  $scope.logout = () => {
    AuthFactory.logout()
  }
}
