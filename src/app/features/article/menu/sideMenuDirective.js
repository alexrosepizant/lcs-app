export default () => {
  return {
    restrict: "E",
    template: require("./menu.html"),
    controller: "ArticleMenuCtrl",
    replace: true,
  }
}
