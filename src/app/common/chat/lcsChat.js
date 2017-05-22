export default () => {
  return {
    restrict: "E",
    replace: true,
    template: require("./chat.html"),
    controller: "ChatCtrl",
    controllerAs: "vm",
  }
}
