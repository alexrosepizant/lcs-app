export default () => {
  return {
    restrict: "E",
    template: require("./comment.html"),
    scope: {
      updateMethod: "&",
      object: "=",
      type: "=",
    },
    controller: "CommentCtrl",
  }
}
