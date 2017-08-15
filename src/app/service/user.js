export default function UserFactory($http, $rootScope, $cookieStore, User) {
  "ngInject"

  const BASE_URL = "lcs-api/user"

  return {
    // Utils
    sortUsers(users) {
      return users.data
        .map((user) => new User(Object.assign({count: user.count}, user._id)))
        .sort((a, b) => b.count - a.count)
    },

    /*
      ENDPOINTS
    */
    findUsers() {
      return $http.get(`/${BASE_URL}`)
        .then((users) => {
          return users.data.map((user) => new User(user))
        })
    },

    findUsersByArticleCount() {
      return $http.get(`/${BASE_URL}/getAuthorsByArticleCount`)
        .then((users) => {
          return this.sortUsers(users)
        })
    },

    findUsersByVoteCount() {
      return $http.get(`/${BASE_URL}/getAuthorsByVoteCount`)
        .then((users) => {
          return this.sortUsers(users)
        })
    },

    getUser(userId) {
      return $http.get(`/${BASE_URL}/${userId}`)
        .then((user) => {
          return new User(user)
        })
    },

    updateUser(user) {
      return $http.put(`/${BASE_URL}/${user._id}`, user)
        .then((response) => {
          const _user = response.data
          $rootScope.currentUser = _user
          $cookieStore.put("user", _user)
          return _user
        })
    },

    deleteUser(userId) {
      return $http.delete(`/${BASE_URL}/${userId}`)
    },
  }
}
