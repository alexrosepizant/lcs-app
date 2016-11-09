export default function ArticleFactory($http) {
  return {
    loadArticles($scope) {
      $http.get("/articles")
        .then((articles) => {
          $scope.articles = articles.data
        })
    },

    findArticle($scope, articleId) {
      $http.get(`/articles/${articleId}`)
        .then((article) => {
          $scope.article = article
        })
    },

    createArticle($scope, article) {
      $http.post("/articles", article)
        .then((article) => {
          $scope.article = article
        })
    },

    updateArticle($scope, article) {
      $http.put(`/articles/${article._id}`, article)
        .then(() => {
          console.log("Article succefully updated")
        })
    },

    deleteArticle($scope, article) {
      $http.delete(`/articles/${article._id}`)
        .then(() => {
          console.log("Article succefully deleted")
        })
    },
  }
}
