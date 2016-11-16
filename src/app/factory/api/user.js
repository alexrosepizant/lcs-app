export default function UserFactory($http) {
  return {
    getUsers() {
      return $http.get("/users")
    },

    getCurrentUser() {
      return $http.get("/users/me")
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
