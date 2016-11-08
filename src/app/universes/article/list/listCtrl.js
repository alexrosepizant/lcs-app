import moment from "moment"

export default function ArticleListCtrl($scope, ArticleFactory) {

  // Load data
  ArticleFactory.loadArticles($scope)

  $scope.getDateFrom = function(article) {
    return moment(article.created).fromNow()
  }
}
