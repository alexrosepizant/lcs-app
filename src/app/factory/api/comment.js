export default function CommentFactory($http) {
  return {
    findComments() {
      return $http.get("/comments")
        .then((comments) => {
          return comments
        })
    },

    getComment(commentId) {
      return $http.get(`/comments/${commentId}`)
        .then((comment) => {
          return comment
        })
    },

    createComment(comment) {
      return $http.post("/comments", comment)
    },

    updateComment(comment) {
      return $http.put(`/comments/${comment._id}`, comment)
    },

    getCommentCount() {
      return $http.get("/commentsCount/")
    },
  }
}
