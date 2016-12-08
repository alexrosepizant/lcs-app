export default () => {
  return {
    restrict: "E",
    template: require("./category.html"),
    scope: {
      article: "=",
    },
    controller: "CategoryCtrl",
  }
}
