import moment from "moment"

export default function CommentCtrl($rootScope, $scope,
    AgendaFactory, ArticleFactory, NotificationFactory, MatchFactory, Comment) {
  "ngInject"

  // Retrieve currentUser
  $scope.currentUser = $rootScope.currentUser

  $scope.init = () => {
    $scope.newComment = ""
    $scope.replies = {}
    $scope.object.comments.forEach((comment, index) => {
      $scope.replies[comment._id] = {
        active: false,
        content: "",
        index: index,
      }
    })
  }

  $scope.showReply = (evt, commentId) => {
    $scope.replies[commentId] = {
      active: true,
    }
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

      $scope.getUpdateMethod()
        .then((object) => {
          $scope.object.__v = object.__v
          $scope.object.comments = object.comments.map((c) => new Comment(c))
          $scope.init()

          // add comment object
          $scope.createCommentContent()
        })
    }
  }

  $scope.addReply = (index, commentId) => {
    if ($scope.replies[commentId].content !== "") {

      $scope.object.comments[index].replies.push({
        user: $scope.currentUser,
        content: $scope.replies[commentId].content,
        created: moment(new Date()).toISOString(),
      })

      $scope.getUpdateMethod()
        .then((object) => {
          $scope.object.__v = object.__v
          $scope.object.comments = object.comments.map((c) => new Comment(c))
          $scope.init()

          $scope.replies[commentId].content = ""
          $scope.replies[commentId].active = false

        // add comment object
          $scope.createCommentContent()
        })
    }
  }

  $scope.getUpdateMethod = () => {
    switch ($scope.type) {
    case "agenda":
      return AgendaFactory.update($scope.object)
    case "match":
      return MatchFactory.update($scope.object)
    default:
      return ArticleFactory.updateArticle($scope.object)
    }
  }

  $scope.createCommentContent = () => {
    NotificationFactory.create({
      title: $scope.object.title,
      user: $scope.currentUser._id,
      type: "comment",
      contentId: $scope.object._id,
      contentType: $scope.object.type || "userEvent",
    })
  }
}
