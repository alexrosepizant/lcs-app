export default function ArticleConfig($stateProvider) {
  $stateProvider
  .state("article", {
    url: "/article",
    template: require("./list/list.html"),
    controller: "ArticleListCtrl",
    title: "Article",
  })
  .state("article.create", {
    url: "/article/create",
    onEnter: ["$stateParams", "$state", "$uibModal", function($stateParams, $state, $uibModal) {
      $uibModal.open({
        templateUrl: "app/universes/article/standard/create.html",
        resolve: {
          item() {
            return {}
          },
        },
        controller: "StandardCreationCtrl",
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
        resolve: {
          item() {
            return {}
          },
        },
        controller: "VideoCreationCtrl",
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
        resolve: {
          item() {
            return {}
          },
        },
        controller: "AlbumCreationCtrl",
      }).result.finally(function() {
        $state.go("^")
      })
    }],
  })
}
