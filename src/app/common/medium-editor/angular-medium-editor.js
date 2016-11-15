import MediumEditor from "medium-editor"

angular.module("angular-medium-editor", [])

.directive("mediumEditor", function() {

  function toInnerText(value) {
    const tempEl = document.createElement("div")
    tempEl.innerHTML = value
    const text = tempEl.textContent || ""
    return text.trim()
  }

  return {
    require: "ngModel",
    restrict: "AE",
    scope: {bindOptions: "="},
    link(scope, iElement, iAttrs, ngModel) {

      angular.element(iElement).addClass("angular-medium-editor")

      // Global MediumEditor
      ngModel.editor = new MediumEditor(iElement, {
        toolbar: {
          /* These are the default options for the toolbar,
          if nothing is passed this is what is used */
          allowMultiParagraphSelection: true,
          buttons: ["bold", "italic", "underline", "anchor", "h2", "h3", "quote"],
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: "medium-editor-button-first",
          lastButtonClass: "medium-editor-button-last",
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
          align: "center",
          sticky: false,
          updateOnEmptySelection: false,
        },
      })

      ngModel.$render = function() {
        iElement.html(ngModel.$viewValue || "")
        const placeholder = ngModel.editor.getExtensionByName("placeholder")
        if (placeholder) {
          placeholder.updatePlaceholder(iElement[0])
        }
      }

      ngModel.$isEmpty = function(value) {
        if (/[<>]/.test(value)) {
          return toInnerText(value).length === 0
        } else if (value) {
          return value.length === 0
        } else {
          return true
        }
      }

      ngModel.editor.subscribe("editableInput", function(event, editable) {
        ngModel.$setViewValue(editable.innerHTML.trim())
      })

      scope.$watch("bindOptions", function(bindOptions) {
        ngModel.editor.init(iElement, bindOptions)
      })

      scope.$on("$destroy", function() {
        ngModel.editor.destroy()
      })
    },
  }
})
