export default function AuthFactory($http, $rootScope, $cookieStore, $state, User) {

  return {
    login(provider, user) {
      return $http.post("/auth/session", {
        provider: provider,
        email: user.email,
        password: user.password,
        rememberMe: true,
      })
    },

    logout() {
      return $http.delete("/auth/session")
        .then(() => this.redirectToLogin())
        .catch(() => this.redirectToLogin())
    },

    redirectToLogin() {
      $rootScope.currentUser = null
      $cookieStore.remove("user")
      $state.go("login")
    },

    createUser(userinfo) {
      return $http.post("/auth/users", userinfo)
    },

    updateCurrentUser() {
      return $http.get("/auth/session")
        .then((result) => $rootScope.currentUser = new User(result.data))
    },

    authenticateUser() {
      this.updateCurrentUser()
        .then(() => $state.go("article"))
    },
  }
}
