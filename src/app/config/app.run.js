function AppRun(AppConstants, $rootScope, $location, AuthFactory, $uibModalStack) {

  // watching the value of the currentUser variable.
  $rootScope.$watch("currentUser", (currentUser) => {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
    if (!currentUser && (["/", "/login", "/logout", "/signup"].indexOf($location.path()) === -1)) {
      AuthFactory.currentUser()
    }
  })

  // On catching 401 errors, redirect to the login page.
  $rootScope.$on("event:auth-loginRequired", () => {
    $location.path("/login")
    return false
  })

  // close all modal on change page
  $rootScope.$on("$stateChangeSuccess", () => {
    $uibModalStack.dismissAll()
  })
}

export default AppRun
