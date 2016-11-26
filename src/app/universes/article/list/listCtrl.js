export default function ArticleListCtrl($scope, articles, users, filter, parameters) {
  // Retrieve params
  $scope.articles = articles
  $scope.users = users
  $scope.filter = filter
  $scope.categories = parameters.articleCategories
}
