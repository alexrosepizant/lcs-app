export default function ArticleListCtrl($scope, $location, ArticleFactory,
  articles, users, filter, currentCategory, parameters) {
  // Retrieve params
  $scope.articles = articles
  $scope.users = users
  $scope.filter = filter
  $scope.currentCategory = currentCategory
  $scope.categories = (parameters) ? parameters.articleCategories : []

  // Pagination
  $scope.maxSize = 5
  $scope.totalItems = 60
  $scope.currentPage = 3

  $scope.pageChanged = () => {
    console.warn("Page changed to: " + $scope.currentPage)
  }

  // Event listener on list update for article creation
  $scope.$on("updateArticleList", () => {
    ArticleFactory.findArticles(filter)
      .then((articles) => $scope.articles = articles)
  })
}
