export default function ArticleFactory($http, Article) {
  return {
    loadArticles(filter) {
      return $http.get("/articles", {
        params: {
          "type": filter,
        },
      }).then((articles) => {
        return articles.data.map((article) => {
          return new Article(article)
        })
      })
    },

    getArticlesByUser($scope) {
      return $http.get("/articles", {
        params: {
          "userId": $scope.user._id,
        },
      }).then((articles) => {
        $scope.articles = articles.data.map((article) => {
          return new Article(article)
        })
      })
    },

    findArticle($scope, articleId) {
      return $http.get(`/articles/${articleId}`)
        .then((article) => {
          $scope.article = article
        })
    },

    createArticle($scope) {
      return $http.post("/articles", $scope.article)
    },

    updateArticle($scope, article) {
      return $http.put(`/articles/${article._id}`, article)
    },

    deleteArticle($scope, article) {
      return $http.delete(`/articles/${article._id}`)
    },
  }
}
