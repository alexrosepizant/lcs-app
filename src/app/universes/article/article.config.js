export default function ArticleConfig($stateProvider) {
  $stateProvider
  .state("article", {
    url: "/article?filter",
    template: require("./list/list.html"),
    controller: "ArticleListCtrl",
    title: "Article",
    resolve: {
      filter: ($stateParams) => {
        return ($stateParams.filter) ? $stateParams.filter : "all"
      },
    },
  })
  .state("article.create", {
    url: "/article/create",
    onEnter: ["$stateParams", "$state", "$uibModal", function($stateParams, $state, $uibModal) {
      $uibModal.open({
        templateUrl: "app/universes/article/standard/create.html",
        controller: "StandardCreationCtrl",
        backdrop: "static",
      }).result.finally(function() {
        $state.go("^")
      })
    }],
  })
  .state("article.createVideo", {
    url: "/article/create/video",
    onEnter: ["$stateParams", "$state", "$uibModal", function($stateParams, $state, $uibModal) {
      $uibModal.open({
        templateUrl: "app/universes/article/video/create.html",
        controller: "VideoCreationCtrl",
        backdrop: "static",
      }).result.finally(function() {
        $state.go("^")
      })
    }],
  })
  .state("article.createAlbum", {
    url: "/article/create/album",
    onEnter: ["$stateParams", "$state", "$uibModal", function($stateParams, $state, $uibModal) {
      $uibModal.open({
        templateUrl: "app/universes/article/album/create.html",
        controller: "AlbumCreationCtrl",
        backdrop: "static",
      }).result.finally(function() {
        $state.go("^")
      })
    }],
  })
}
