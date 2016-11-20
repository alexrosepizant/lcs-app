export default function lcsBlogPostDirective() {
  return {
    restrict: "E",
    replace: true,
    link(scope, element, attrs) {
      scope.contentUrl = "app/universes/article/list/tile/" + attrs.type + ".html"
    },
    template: "<div ng-include='contentUrl'></div>",
  }
}
