export default function ArticleConfig($stateProvider) {
  $stateProvider
  .state("article", {
    url: "/article?filter",
    template: require("./list/list.html"),
    controller: "ArticleListCtrl",
    title: "Article",
    resolve: {
      articles: ($stateParams, ArticleFactory) => {
        const filter = ($stateParams.filter) ? $stateParams.filter : "all"
        return ArticleFactory.findArticles(filter)
      },
      users: (UserFactory) => {
        return UserFactory.findUsers()
      },
      filter: ($stateParams) => {
        return ($stateParams.filter) ? $stateParams.filter : "all"
      },
      parameters: (ParameterFactory) => {
        return ParameterFactory.getParameters()
      },
    },
  })
  .state("article.create", {
    url: "/article/create",
    onEnter: ["$state", "$uibModal", function($state, $uibModal) {
      $uibModal.open({
        templateUrl: "app/universes/article/creation/standard/create.html",
        controller: "StandardCreationCtrl",
        backdrop: "static",
        animation: false,
      }).result.finally(function() {
        $state.go("^")
      })
    }],
  })
  .state("article.createVideo", {
    url: "/article/create/video",
    onEnter: ["$state", "$uibModal", function($state, $uibModal) {
      $uibModal.open({
        templateUrl: "app/universes/article/creation/video/create.html",
        controller: "VideoCreationCtrl",
        backdrop: "static",
        animation: false,
      }).result.finally(function() {
        $state.go("^")
      })
    }],
  })
  .state("article.createAlbum", {
    url: "/article/create/album",
    onEnter: ["$state", "$uibModal", function($state, $uibModal) {
      $uibModal.open({
        templateUrl: "app/universes/article/creation/album/create.html",
        controller: "AlbumCreationCtrl",
        backdrop: "static",
        animation: false,
      }).result.finally(function() {
        $state.go("^")
      })
    }],
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
