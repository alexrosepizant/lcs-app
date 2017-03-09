export default () => {
  return {
    restrict: "E",
    replace: true,
    link(scope, element, attrs) {
      scope.contentUrl = "app/features/article/list/tile/" + attrs.type + ".html"
    },
    template: "<div ng-include='contentUrl'></div>",
  }
}
