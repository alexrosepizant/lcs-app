export default function ArticleFactory($http, Article) {
  return {
    findArticles(filter) {
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

    getArticlesByCategory(category) {
      return $http.get("/articles", {
        params: {
          "categories": category,
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

    getArticle(articleId) {
      return $http.get(`/articles/${articleId}`)
      .then((article) => {
        return new Article(article.data)
      })
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
