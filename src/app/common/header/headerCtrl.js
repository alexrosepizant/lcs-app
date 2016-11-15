export default function GlobalCtrl($rootScope, $scope, AuthFactory, $location, ngPopoverFactory) {

  // Main menu
  $scope.menu = [{
    name: "Accueil",
    id: "home",
    link: "home",
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
  }, {
    name: "Votes",
    id: "vote",
    link: "vote",
    notificationNumber: 0,
  }, {
    name: "Boite à idées",
    id: "idea",
    link: "idea",
    notificationNumber: 0,
  }, {
    name: "Archives",
    id: "archive",
    link: "archive",
    notificationNumber: 0,
  }]

  $scope.isCurrentPath = (item) => {
    return $location.path().indexOf(item.id) !== -1 || ($location.path() === "/" && item.id === "home")
  }

  // Search
  $scope.search = () => {
    console.warn($scope.searchWord)
  }

  // User menu
  $scope.currentUser = $rootScope.currentUser

  $scope.closeMenu = (triggerId) => {
    ngPopoverFactory.closePopover(triggerId)
  }

  $scope.logout = () => {
    AuthFactory.logout((err) => {
      if (!err) {
        $location.path("/login")
      }
    })
  }
}
