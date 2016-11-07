function AppRun(AppConstants, $rootScope, $location, AuthFactory) {

  // watching the value of the currentUser variable.
  $rootScope.$watch("currentUser", function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
    if (!currentUser && (["/", "/login", "/logout", "/signup"].indexOf($location.path()) === -1)) {
      AuthFactory.currentUser()
    }
  })

    // On catching 401 errors, redirect to the login page.
  $rootScope.$on("event:auth-loginRequired", function() {
    $location.path("/login")
    return false
  })

  // change page title based on state
  $rootScope.$on("$stateChangeSuccess", (event, toState) => {
    $rootScope.setPageTitle(toState.title)
  })

  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = ""
    if (title) {
      $rootScope.pageTitle += title
      $rootScope.pageTitle += " \u2014 "
    }
    $rootScope.pageTitle += AppConstants.appName
  }
}

export default AppRun
