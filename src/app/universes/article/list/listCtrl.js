import moment from "moment"

export default function ArticleListCtrl($scope, ArticleFactory) {
  ArticleFactory.loadArticles($scope)

  $scope.getDateFrom = function(article) {
    return moment(article.created).fromNow()
  }
}
