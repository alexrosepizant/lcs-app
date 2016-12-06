export default function ArticleConfig($stateProvider) {
  $stateProvider
  .state("article", {
    url: "/article?filter&category&page",
    template: require("./list/list.html"),
    controller: "ArticleListCtrl",
    title: "Article",
    resolve: {
      articles: ($stateParams, ArticleFactory) => {
        const filter = ($stateParams.filter) ? $stateParams.filter : "all"
        const category = ($stateParams.category) ? $stateParams.category : null
        const page = ($stateParams.page) ? $stateParams.page : 0
        if (category) {
          return ArticleFactory.getArticlesByCategory(category, page)
        } else {
          return ArticleFactory.findArticles(filter, page)
        }
      },
      count: (ArticleFactory) => {
        return ArticleFactory.getArticleCount()
      },
      users: (UserFactory) => {
        return UserFactory.findUsers()
      },
      filter: ($stateParams) => {
        return ($stateParams.filter) ? $stateParams.filter : "all"
      },
      currentCategory: ($stateParams) => {
        return ($stateParams.category) ? $stateParams.category : null
      },
      parameters: (ParameterFactory) => {
        return ParameterFactory.getParameters()
      },
      page: ($stateParams) => {
        return ($stateParams.page) ? $stateParams.page : 0
      },
    },
  })
  .state("article.create", {
    parent: "article",
    url: "/create",
    onEnter: ($state, $uibModal) => {
      $uibModal.open({
        templateUrl: "app/universes/article/creation/standard/create.html",
        controller: "StandardCreationCtrl",
        backdrop: "static",
        animation: false,
        resolve: {
          article: ($rootScope, $stateParams, ArticleFactory, Article) => {
            return ($stateParams.articleId) ? ArticleFactory.getArticle($stateParams.articleId) : new Article({
              type: "standard",
              user: $rootScope.currentUser._id,
            })
          },
          parameters: (ParameterFactory) => {
            return ParameterFactory.getParameters()
          },
        },
      }).result.finally(() => {
        $state.go("^")
      })
    },
  })
  .state("article.createVideo", {
    parent: "article",
    url: "/create/video",
    onEnter: ($state, $uibModal) => {
      $uibModal.open({
        templateUrl: "app/universes/article/creation/video/create.html",
        controller: "VideoCreationCtrl",
        backdrop: "static",
        animation: false,
        resolve: {
          article: ($rootScope, $stateParams, ArticleFactory, Article) => {
            return ($stateParams.articleId) ? ArticleFactory.getArticle($stateParams.articleId) : new Article({
              type: "video",
              user: $rootScope.currentUser._id,
              url: "",
            })
          },
          parameters: (ParameterFactory) => {
            return ParameterFactory.getParameters()
          },
        },
      }).result.finally(() => {
        $state.go("^")
      })
    },
  })
  .state("article.createAlbum", {
    parent: "article",
    url: "/create/album",
    onEnter: ($state, $uibModal) => {
      $uibModal.open({
        templateUrl: "app/universes/article/creation/album/create.html",
        controller: "AlbumCreationCtrl",
        backdrop: "static",
        animation: false,
        resolve: {
          article: ($rootScope, $stateParams, ArticleFactory, Article) => {
            return ($stateParams.articleId) ? ArticleFactory.getArticle($stateParams.articleId) : new Article({
              type: "album",
              user: $rootScope.currentUser._id,
            })
          },
          parameters: (ParameterFactory) => {
            return ParameterFactory.getParameters()
          },
        },
      }).result.finally(() => {
        $state.go("^")
      })
    },
  })
  .state("albumView", {
    url: "/article/album/view?articleId",
    template: require("./detail/album/detail.html"),
    controller: "AlbumDetailCtrl",
    title: "Article",
    resolve: {
      article: ($stateParams, ArticleFactory) => {
        return ArticleFactory.getArticle($stateParams.articleId)
      },
    },
  })
  .state("standardView", {
    url: "/article/standard/view?articleId",
    template: require("./detail/standard/detail.html"),
    controller: "StandardDetailCtrl",
    title: "Article",
    resolve: {
      article: ($stateParams, ArticleFactory) => {
        return ArticleFactory.getArticle($stateParams.articleId)
      },
    },
  })
  .state("videoView", {
    url: "/article/video/view?articleId",
    template: require("./detail/video/detail.html"),
    controller: "VideoDetailCtrl",
    title: "Article",
    resolve: {
      article: ($stateParams, ArticleFactory) => {
        return ArticleFactory.getArticle($stateParams.articleId)
      },
    },
  })
}
