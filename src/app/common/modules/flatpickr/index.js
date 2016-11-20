import Flatpickr from "flatpickr"
import French from "flatpickr/dist/l10n/fr"

angular.module("angular-flatpickr", []).directive("ngFlatpickr", [function() {
  return {
    require: "ngModel",
    restrict : "A",
    scope : {
      fpOpts : "&",
      fpOnSetup : "&",
    },
    link(scope, element, attrs, ngModel) {
      const vp = new Flatpickr(element[0], angular.extend(
        scope.fpOpts(),
        {
          "locale": French,
        })
      )

      if (scope.fpOnSetup) {
        scope.fpOnSetup({
          fpItem : vp,
        })
      }

      element.on("click", function() {
        scope.$apply(function() {
          ngModel.$setViewValue(vp.selectedDateObj)
        })
      })
    },
  }
}])
