export default function lcsBlogPostDirective() {
  return {
    restrict: "E",
    replace: true,
    link(scope, element, attrs) {
      scope.contentUrl = "app/universes/article/" + attrs.type + "/tile.html"
    },
    template: "<div ng-include='contentUrl'></div>",
  }
}
