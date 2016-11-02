export default function CommentFactory($http) {

  function getComments($scope) {
    $http.get("/comments").success((comments) => {
      $scope.comments = comments
    })
  }

  function getComment($scope, commentId) {
    $http.get(`/comments/${commentId}`).success((comment) => {
      $scope.comment = comment
    })
  }

  function createComment($scope, comment) {
    $http.post("/comments", comment).success((comment) => {
      $scope.comment = comment
    })
  }

  function updateComment($scope, comment) {
    $http.put(`/comments/${comment._id}`, comment).success(() => {
      console.warn("Comment updated")
    })
  }

  function getCommentCount($scope) {
    $http.get("/commentsCount/").success((commentsCount) => {
      $scope.commentsCount = commentsCount
    })
  }

  return {
    getComments,
    getComment,
    createComment,
    updateComment,
    getCommentCount,
  }
}
