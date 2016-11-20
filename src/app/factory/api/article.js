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

    getArticlesByUser(userId) {
      return $http.get("/articles", {
        params: {
          "userId": userId,
        },
      }).then((articles) => {
        return articles.data.map((article) => {
          return new Article(article)
        })
      })
    },

    findArticle(articleId) {
      return $http.get(`/articles/${articleId}`)
    },

    createArticle(article) {
      return $http.post("/articles", article)
    },

    updateArticle(article) {
      return $http.put(`/articles/${article._id}`, article)
    },

    deleteArticle(articleId) {
      return $http.delete(`/articles/${articleId}`)
    },
  }
}
