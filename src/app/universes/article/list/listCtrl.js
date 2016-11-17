export default function ArticleListCtrl($scope, articles, users, filter) {
  // Retrieve params
  $scope.articles = articles
  $scope.users = users
  $scope.filter = filter
}
