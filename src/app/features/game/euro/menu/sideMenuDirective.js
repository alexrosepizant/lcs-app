export default () => {
  return {
    restrict: "E",
    template: require("./sideMenu.html"),
    controller: "SideMenuCtrl",
    controllerAs: "$ctrl",
    replace: true,
  }
}
