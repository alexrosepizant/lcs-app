export default function ArticleListCtrl($scope, $state, ArticleFactory,
  articles, users, filter, currentCategory, parameters, count, page) {

    /**
    Retrieve params
    **/
  $scope.articles = articles
  $scope.users = users
  $scope.filter = filter
  $scope.currentCategory = currentCategory
  $scope.categories = (parameters) ? parameters.articleCategories : []

    /**
    Pagination
    **/
  $scope.maxSize = 5
  $scope.totalItems = count
  $scope.currentPage = page
  $scope.itemPerPage = 20

  $scope.pageChanged = () => {
    ArticleFactory.findArticles($scope.filter, $scope.currentPage - 1)
      .then((articles) => {
        $scope.articles = articles
      })
  }

    /**
    Event listener on list update for article creation
    **/
  $scope.$on("updateArticleList", () => {
    ArticleFactory.findArticles(filter)
      .then((articles) => $scope.articles = articles)
  })
}
