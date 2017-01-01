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

    findUsersByArticleCount() {
      return $http.get("/users/getAuthorsByArticleCount")
        .then((users) => {
          return users.data.map((user) => {
            return new User(Object.assign({count: user.count}, user._id))
          }).sort((a, b) => {
            return b.count - a.count
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
      return $http.put(`/users/${user._id}`, user)
        .then((user) => {
          $rootScope.currentUser = user
          $cookieStore.put("user", user)
          return user
        })
    },

    deleteUser(userId) {
      return $http.delete(`/users/${userId}`)
    },
  }
}
