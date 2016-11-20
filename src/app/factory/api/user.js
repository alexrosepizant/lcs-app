export default function UserFactory($http, $rootScope, $cookieStore, User) {
  return {
    findUsers() {
      return $http.get("/users")
        .then((users) => {
          return users.data.map((user) => {
            return new User(user)
          })
        })
    },

    getUser(userId) {
      return $http.get(`/users/${userId}`)
        .then((user) => {
          return new User(user)
        })
    },

    updateUser(user) {
      $rootScope.currentUser = user
      $cookieStore.put("user", user)
      return $http.put(`/users/${user._id}`, user)
    },

    deleteUser(userId) {
      return $http.delete(`/users/${userId}`)
    },

    addReadArticle(articleId) {
      console.warn(articleId)
    },
  }
}
