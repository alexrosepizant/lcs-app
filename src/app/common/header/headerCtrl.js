export default function HeaderCtrl($rootScope, $scope, AuthFactory, $location, Notification) {
  "ngInject"

  $scope.currentUser = $rootScope.currentUser

  // Main menu
  $scope.menu = [{
    name: "A la une",
    link: "article",
  }, {
    name: "Les rencards",
    link: "agenda",
  },
  {
    name: "L'isoloir",
    link: "vote",
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

  $scope.$on("newMessage", () => {
    $scope.hasNewMessage = true
  })

  // Logout action
  $scope.logout = () => {
    AuthFactory.logout()
  }
}
