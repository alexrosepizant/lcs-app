export default function AuthFactory($http, $rootScope, $cookieStore, $state, User) {
  "ngInject"

  const BASE_URL = "auth"

  return {
    login(provider, user) {
      return $http.post(`/${BASE_URL}/session`, {
        provider: provider,
        email: user.email,
        password: user.password,
        rememberMe: true,
      })
    },

    logout() {
      return $http.delete(`/${BASE_URL}/session`)
        .then(() => this.redirectToLogin())
        .catch(() => this.redirectToLogin())
    },

    redirectToLogin() {
      $rootScope.currentUser = null
      $cookieStore.remove("user")
      $state.go("login")
    },

    createUser(userinfo) {
      return $http.post(`/${BASE_URL}/users`, userinfo)
    },

    updateCurrentUser() {
      return $http.get(`/${BASE_URL}/session`)
        .then((result) => $rootScope.currentUser = new User(result.data))
    },

    authenticateUser() {
      this.updateCurrentUser()
        .then(() => $state.go("blog"))
    },
  }
}
