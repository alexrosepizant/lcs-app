export default () => {
  return {
    restrict: "E",
    template: require("./topMenu.html"),
    controller: "TopMenuCtrl",
    controllerAs: "$ctrl",
  }
}
