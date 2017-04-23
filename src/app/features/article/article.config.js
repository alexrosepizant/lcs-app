export default function ArticleConfig($stateProvider) {
  "ngInject"

  /*
  View structure
  */
  $stateProvider
  .state("blog", {
    redirectTo: "article.list",
  })
  .state("article", {
    url: "/blog/article",
    abstract: true,
    template: require("./article.html"),
  })

  /*
  View for list
  */
  .state("article.list", {
    url: "/list?filter&category&page",
    template: require("./list/list.html"),
    controller: "ArticleListCtrl",
    resolve: {
      articles: ($rootScope, $stateParams, ArticleFactory) => {
        const page = ($stateParams.page) ? $stateParams.page : 0
        const filter = ($stateParams.filter) ? $stateParams.filter : "all"
        return ArticleFactory.findArticles(filter, page)
      },
      filter: ($stateParams) => {
        return ($stateParams.filter) ? $stateParams.filter : "all"
      },
      count: (ArticleFactory) => {
        return ArticleFactory.getArticleCount()
      },
      users: (UserFactory) => {
        return UserFactory.findUsersByArticleCount()
      },
      parameters: (ParameterFactory) => {
        return ParameterFactory.getParameters()
      },
      page: ($stateParams) => {
        return ($stateParams.page) ? $stateParams.page : 0
      },
    },
  })

  /*
  Views for creation
  */
  .state("article.createAlbum", {
    parent: "article.list",
    url: "/create/album",
    onEnter: ($state, $uibModal) => {
      $uibModal.open({
        template : require("./creation/album/create.html"),
        controller: "AlbumCreationCtrl",
        backdrop: "static",
        animation: false,
        resolve: {
          article: ($rootScope, ArticleFactory, Article) => {
            return new Article({
              type: "album",
              user: $rootScope.currentUser._id,
              photoList: [],
            })
          },
        },
      }).result.finally(() => {
        $state.go("^")
      })
    },
  })
  .state("article.create", {
    parent: "article.list",
    url: "/create",
    onEnter: ($state, $uibModal) => {
      $uibModal.open({
        template : require("./creation/standard/create.html"),
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
        },
      }).result.finally(() => {
        $state.go("^")
      })
    },
  })
  .state("article.createVideo", {
    parent: "article.list",
    url: "/create/video",
    onEnter: ($state, $uibModal) => {
      $uibModal.open({
        template : require("./creation/video/create.html"),
        controller: "VideoCreationCtrl",
        backdrop: "static",
        animation: false,
        resolve: {
          article: ($rootScope, Article) => {
            return new Article({
              type: "video",
              user: $rootScope.currentUser._id,
              url: "",
            })
          },
        },
      }).result.finally(() => {
        $state.go("^")
      })
    },
  })

  /*
  Views for detail
  */
  .state("article.albumView", {
    url: "/album/view?articleId",
    template: require("./detail/album/detail.html"),
    controller: "AlbumDetailCtrl",
    resolve: {
      article: ($stateParams, ArticleFactory) => {
        return ArticleFactory.getArticle($stateParams.articleId)
      },
    },
  })
  .state("article.standardView", {
    url: "/standard/view?articleId",
    template: require("./detail/standard/detail.html"),
    controller: "StandardDetailCtrl",
    resolve: {
      article: ($stateParams, ArticleFactory) => {
        return ArticleFactory.getArticle($stateParams.articleId)
      },
    },
  })
  .state("article.videoView", {
    url: "/video/view?articleId",
    template: require("./detail/video/detail.html"),
    controller: "VideoDetailCtrl",
    resolve: {
      article: ($stateParams, ArticleFactory) => {
        return ArticleFactory.getArticle($stateParams.articleId)
      },
    },
  })

  /*
  Views for update
  */
  .state("article.updateAlbum", {
    parent: "article.albumView",
    url: "/update/album?articleId",
    onEnter: ($state, $stateParams, $uibModal) => {
      $uibModal.open({
        template : require("./creation/album/create.html"),
        controller: "AlbumCreationCtrl",
        backdrop: "static",
        animation: false,
        resolve: {
          article: (ArticleFactory) => {
            return ArticleFactory.getArticle($stateParams.articleId)
          },
        },
      }).result.finally(() => {
        $state.go("^")
      })
    },
  })
  .state("article.update", {
    parent: "article.standardView",
    url: "/update?articleId",
    onEnter: ($state, $stateParams, $uibModal) => {
      $uibModal.open({
        template : require("./creation/standard/create.html"),
        controller: "StandardCreationCtrl",
        backdrop: "static",
        animation: false,
        resolve: {
          article: (ArticleFactory) => {
            return ArticleFactory.getArticle($stateParams.articleId)
          },
        },
      }).result.finally(() => {
        $state.go("^")
      })
    },
  })
  .state("article.updateVideo", {
    parent: "article.videoView",
    url: "/update/video?articleId",
    onEnter: ($state, $stateParams, $uibModal) => {
      $uibModal.open({
        template : require("./creation/video/create.html"),
        controller: "VideoCreationCtrl",
        backdrop: "static",
        animation: false,
        resolve: {
          article: (ArticleFactory) => {
            return ArticleFactory.getArticle($stateParams.articleId)
          },
        },
      }).result.finally(() => {
        $state.go("^")
      })
    },
  })
}
