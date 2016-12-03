import moment from "moment"

export default function StandardDetailCtrl($rootScope, $scope, ArticleFactory, CommentFactory, article) {
  // Init variables
  $scope.currentUser = $rootScope.currentUser
  $scope.article = article

  $scope.addComment = () => {
    if ($scope.newComment !== "") {

      if (!$scope.article.comments) {
        $scope.article.comments = []
      }

      $scope.article.comments.push({
        user: $scope.currentUser,
        content: $scope.newComment,
        created: moment(new Date()).toISOString(),
      })

      ArticleFactory.updateArticle(angular.extend($scope.article, {
        user: $scope.article.user._id,
      })).then((newObject) => {

        $scope.article.__v = newObject.__v
        $scope.newComment = ""

          // add comment article
        CommentFactory.createComment({
          user: $scope.currentUser._id,
          contentType: $scope.article.type,
          contentId: $scope.article._id,
        })
      })
    }
  }

  $scope.showReply = (evt, comment) => {
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }

    $scope.currentComment = comment
  }

  $scope.isCurrentComment = (comment) => {
    return $scope.currentComment === comment
  }

  $scope.addReply = (text) => {
    if (text !== "") {

      $scope.currentComment.replies.push({
        user: $scope.currentUser._id,
        content: text,
        created: moment(new Date()).toISOString(),
      })

      ArticleFactory.updateArticle(angular.extend($scope.article,{
        user: $scope.article.user._id,
      })).then((newObject) => {
        $scope.article.__v = newObject.__v

        // add comment object
        CommentFactory.createComment({
          user: $scope.currentUser._id,
          contentType: $scope.article.type,
          contentId: $scope.article._id,
        })
      })
    }
  }
}
