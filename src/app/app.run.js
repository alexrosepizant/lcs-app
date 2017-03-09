function AppRun($rootScope, $location, AuthFactory, $uibModalStack) {
  "ngInject"

  // if no currentUser and on a page that requires authorization then try to update it
  // will trigger 401s if user does not have a valid session
  $rootScope.$watch("currentUser", (currentUser) => {
    if (!currentUser && (["/login", "/logout", "/signup"].indexOf($location.path()) === -1)) {
      AuthFactory.updateCurrentUser()
    }
  })

  // On catching 401 errors, redirect to the login page.
  $rootScope.$on("event:auth-loginRequired", () => {
    AuthFactory.logout()
  })

    // close all modal on change page
  $rootScope.$on("$stateChangeSuccess", () => {
    $uibModalStack.dismissAll()
  })
}

export default AppRun