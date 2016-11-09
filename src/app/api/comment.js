export default function CommentFactory($http) {
  return {
    loadComments($scope) {
      $http.get("/comments")
        .then((comments) => {
          $scope.comments = comments
        })
    },

    findComment($scope, commentId) {
      $http.get(`/comments/${commentId}`)
        .then((comment) => {
          $scope.comment = comment
        })
    },

    createComment($scope, comment) {
      $http.post("/comments", comment)
        .then((comment) => {
          $scope.comment = comment
        })
    },

    updateComment($scope, comment) {
      $http.put(`/comments/${comment._id}`, comment)
        .then(() => {
          console.warn("Comment updated")
        })
    },

    getCommentCount($scope) {
      $http.get("/commentsCount/")
        .then((commentsCount) => {
          $scope.commentsCount = commentsCount
        })
    },
  }
}
