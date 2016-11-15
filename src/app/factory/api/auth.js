export default function AuthFactory($http, $rootScope, $cookieStore, $location) {

  $rootScope.currentUser = $cookieStore.get("user") || null
  $cookieStore.remove("user")

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
      $location.path("/login")
    },

    createUser(userinfo) {
      return $http.post("/auth/users", userinfo)
    },

    currentUser() {
      return $http.get("/auth/session")
        .then((result) => $rootScope.currentUser = result.data)
    },

    authenticateUser() {
      this.currentUser()
        .then(() => $location.path("/home"))
    },
  }
}