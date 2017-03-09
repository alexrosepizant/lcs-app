export default () => {
  return {
    restrict: "E",
    replace: true,
    template: require("./notification.html"),
    controller: "NotificationCtrl",
  }
}
