export default function ArticleFactory($http, AppConstants, Article) {
  return {
    findArticles(filter, page = 0) {
      return $http.get("/articles", {
        params: {
          type: filter,
          perPage: AppConstants.aticlePerPage,
          page: page,
        },
      }).then((articles) => {
        return articles.data.map((article) => {
          return new Article(article)
        })
      })
    },

    getArticlesByCategory(category, page = 0) {
      return $http.get("/articles", {
        params: {
          categories: category,
          perPage: AppConstants.aticlePerPage,
          page: page,
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
          userId: userId,
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

    getArticleCount() {
      return $http.get("/articles/count")
      .then((result) => {
        return result.data
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
