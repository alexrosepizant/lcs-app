export default function UserFactory($http, $rootScope, $cookieStore, User) {
  "ngInject"

  return {
    findUsers() {
      return $http.get("/users")
        .then((users) => {
          return users.data.map((user) => new User(user))
        })
    },

    findUsersByArticleCount() {
      return $http.get("/users/getAuthorsByArticleCount")
        .then((users) => {
          return users.data
            .map((user) => new User(Object.assign({count: user.count}, user._id)))
            .sort((a, b) => b.count - a.count)
        })
    },

    findUsersByVoteCount() {
      return $http.get("/users/getAuthorsByVoteCount")
        .then((users) => {
          return users.data
            .map((user) => new User(Object.assign({count: user.count}, user._id)))
            .sort((a, b) => b.count - a.count)
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
        .then((response) => {
          const _user = response.data
          $rootScope.currentUser = _user
          $cookieStore.put("user", _user)
          return _user
        })
    },

    deleteUser(userId) {
      return $http.delete(`/users/${userId}`)
    },
  }
}
