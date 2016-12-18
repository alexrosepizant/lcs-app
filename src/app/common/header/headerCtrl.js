export default function GlobalCtrl($rootScope, $scope, AuthFactory, $location, Notification) {

  $scope.currentUser = $rootScope.currentUser

  // Main menu
  $scope.menu = [{
    name: "Accueil",
    id: "home",
    link: "home",
    notificationNumber: 0,
  }, {
    name: "Le site",
    id: "idea",
    link: "idea",
    notificationNumber: 0,
  }, {
    name: "Blog",
    id: "article",
    link: "article",
    notificationNumber: 0,
  }, {
    name: "Agenda",
    link: "agenda",
    id: "agenda",
    notificationNumber: 0,
  // }, {
  //   name: "Votes",
  //   id: "vote",
  //   link: "vote",
  //   notificationNumber: 0,
  }, {
    name: "En ce moment",
    id: "archive",
    link: "archive",
    notificationNumber: 0,
  }]

  $scope.isCurrentPath = (item) => {
    return ($location.path() === "/" && item.id === "home") ||
            $location.path().indexOf(item.id) !== -1
  }

  // Search
  $scope.search = () => {
    Notification.info({
      title: "Info",
      message: "C'est pour bientôt!",
    })
  }

  $scope.$on("onNewMessage", () => {
    $scope.showChat = true
  })

  // Logout action
  $scope.logout = () => {
    AuthFactory.logout((err) => {
      if (!err) {
        $location.path("/login")
      }
    })
  }
}
