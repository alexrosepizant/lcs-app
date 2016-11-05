export default function ArticleConfig($stateProvider) {
  $stateProvider
    .state("article", {
      url: "/article",
      template: require("./list/list.html"),
      controller: "ArticleListCtrl",
      title: "Article",
    })
    .state("videoCreation", {
      url: "/video/create",
      template: require("./video/create.html"),
      controller: "VideoCreationCtrl",
      title: "Article",
    })
}
