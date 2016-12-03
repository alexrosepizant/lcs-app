export default function ArticleListCtrl($scope, ArticleFactory, articles, users, filter, currentCategory, parameters) {
  // Retrieve params
  $scope.articles = articles
  $scope.users = users
  $scope.filter = filter
  $scope.currentCategory = currentCategory
  $scope.categories = (parameters) ? parameters.articleCategories : []

  $scope.$on("updateArticleList", () => {
    ArticleFactory.findArticles(filter)
      .then((articles) => $scope.articles = articles)
  })
}
