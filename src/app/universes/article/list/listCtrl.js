export default function ArticleListCtrl($scope, ArticleFactory, filter) {
  $scope.filter = filter
  ArticleFactory.loadArticles($scope)
}
