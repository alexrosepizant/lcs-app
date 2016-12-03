import moment from "moment"

export default function CommentCtrl($rootScope, $scope, ArticleFactory, CommentFactory) {

  // Retrieve currentUser
  $scope.currentUser = $rootScope.currentUser
  $scope.replies = {}

  $scope.object.comments.forEach((comment, index) => {
    $scope.replies[comment._id] = {
      active: false,
      content: "",
      index: index,
    }
  })

  $scope.showReply = (evt, commentId) => {
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }

    $scope.replies[commentId].active = true
  }

  $scope.isCurrentComment = (commentId) => {
    return $scope.replies[commentId] && $scope.replies[commentId].active
  }

  $scope.addComment = () => {
    if ($scope.newComment !== "") {

      if (!$scope.object.comments) {
        $scope.object.comments = []
      }

      $scope.object.comments.push({
        user: $scope.currentUser,
        content: $scope.newComment,
        created: moment(new Date()).toISOString(),
      })

      ArticleFactory.updateArticle(angular.extend($scope.object, {
        user: $scope.object.user._id,
      })).then((newObject) => {

        $scope.object.__v = newObject.__v
        $scope.newComment = ""

          // add comment object
        $scope.createCommentContent()
      })
    }
  }

  $scope.addReply = (commentId) => {
    if ($scope.replies[commentId].content !== "") {

      const index = $scope.replies[commentId].index
      if (!$scope.object.comments[index].replies) {
        $scope.object.comments[index].replies = []
      }

      $scope.object.comments[index].replies.push({
        user: $scope.currentUser,
        content: $scope.replies[commentId].content,
        created: moment(new Date()).toISOString(),
      })

      ArticleFactory.updateArticle(angular.extend($scope.object,{
        user: $scope.object.user._id,
      })).then((newObject) => {
        $scope.object.__v = newObject.__v
        $scope.replies[commentId].content = ""
        $scope.replies[commentId].active = false

        // add comment object
        $scope.createCommentContent()
      })
    }
  }

  $scope.createCommentContent = () => {
    CommentFactory.createComment({
      user: $scope.currentUser._id,
      contentType: $scope.object.type,
      contentId: $scope.object._id,
    })
  }
}
