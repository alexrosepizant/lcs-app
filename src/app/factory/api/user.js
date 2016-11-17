export default function UserFactory($http, User) {
  return {
    getUsers() {
      return $http.get("/users")
      .then((users) => {
        return users.data.map((user) => {
          return new User(user)
        })
      })
    },

    getUser($scope, userId) {
      return $http.get(`/users/${userId}`)
    },

    updateUser($scope, user) {
      return $http.put(`/users/${user._id}`, user)
    },

    deleteUser($scope, user) {
      return $http.delete(`/users/${user._id}`)
    },

    addReadArticle(articleId) {
      console.warn(articleId)
    },
  }
}
