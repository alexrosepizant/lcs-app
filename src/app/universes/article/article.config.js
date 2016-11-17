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
        return ArticleFactory.loadArticles(filter)
      },
      users: (UserFactory) => {
        return UserFactory.getUsers()
      },
      filter: ($stateParams) => {
        return ($stateParams.filter) ? $stateParams.filter : "all"
      },
    },
  })
  .state("article.create", {
    url: "/article/create",
    onEnter: ["$state", "$uibModal", function($state, $uibModal) {
      $uibModal.open({
        templateUrl: "app/universes/article/standard/create.html",
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
        templateUrl: "app/universes/article/video/create.html",
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
        templateUrl: "app/universes/article/album/create.html",
        controller: "AlbumCreationCtrl",
        backdrop: "static",
        animation: false,
      }).result.finally(function() {
        $state.go("^")
      })
    }],
  })
}
