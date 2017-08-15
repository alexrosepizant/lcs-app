export default function ArticleFactory($http, AppConstants, Article) {
  "ngInject"

  const BASE_URL = "lcs-api/article"

  return {
    findArticles(filter, page = 0) {
      return $http.get(`/${BASE_URL}`, {
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
      return $http.get(`/${BASE_URL}`, {
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
      return $http.get(`/${BASE_URL}`, {
        params: {
          userId: userId,
        },
      }).then((articles) => {
        return articles.data.map((article) => {
          return new Article(article)
        })
      })
    },

    getArticleCount() {
      return $http.get(`/${BASE_URL}/count`)
        .then((result) => {
          return result.data
        })
    },

    getArticle(articleId) {
      return $http.get(`/${BASE_URL}/${articleId}`)
        .then((article) => {
          return new Article(article.data)
        })
    },

    createArticle(article) {
      if (article._id) {
        return this.updateArticle(article)
      }
      return $http.post(`/${BASE_URL}`, article)
        .then((article) => {
          return new Article(article.data)
        })
    },

    updateArticle(article) {
      return $http.put(`/${BASE_URL}/${article._id}`, article)
        .then((article) => {
          return new Article(article.data)
        })
    },

    deleteArticle(articleId) {
      return $http.delete(`/${BASE_URL}/${articleId}`)
    },
  }
}
