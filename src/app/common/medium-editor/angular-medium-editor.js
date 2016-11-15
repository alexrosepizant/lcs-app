import MediumEditor from "medium-editor"

angular.module("angular-medium-editor", []).directive("mediumEditor", () => {

  // Util function
  function toInnerText(value) {
    const tempEl = document.createElement("div")
    tempEl.innerHTML = value
    const text = tempEl.textContent || ""
    return text.trim()
  }

  // New buttons added
  function Fullscreen() {
  }

  function fullscreenClick() {
    const elt = document.getElementsByClassName("modal-dialog")[0]

    // go full-screen
    if (elt.requestFullscreen) {
      elt.requestFullscreen()
    } else if (elt.webkitRequestFullscreen) {
      elt.webkitRequestFullscreen()
    } else if (elt.mozRequestFullScreen) {
      elt.mozRequestFullScreen()
    } else if (elt.msRequestFullscreen) {
      elt.msRequestFullscreen()
    }
  }

  Fullscreen.prototype.getButton = () => {
    const button = document.createElement("button")
    button.innerHTML = "<i class='fa fa-expand'></i>"
    button.addEventListener("click", fullscreenClick)
    return button
  }

  return {
    require: "ngModel",
    restrict: "AE",
    scope: {bindOptions: "="},
    link(scope, iElement, iAttrs, ngModel) {

      angular.element(iElement).addClass("angular-medium-editor")

      // Global MediumEditor
      ngModel.editor = new MediumEditor(iElement, {
        buttonLabels: "fontawesome",
        toolbar: {
          buttons: [
            "bold",
            "italic",
            "underline",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "h1",
            "h2",
            "h3",
            "quote",
            "fullscreen",
          ],
          diffLeft: 0,
          diffTop: -10,
        },
        anchor: {
          placeholderText: "Type a link",
          customClassOption: "btn",
          customClassOptionText: "Create Button",
        },
        paste: {
          forcePlainText: true,
          cleanPastedHTML: false,
          cleanReplacements: [],
          cleanAttrs: ["class", "style", "dir"],
          cleanTags: ["meta"],
        },
        extensions: {
          fullscreen: new Fullscreen(),
        },
      })

      ngModel.$render = () => {
        iElement.html(ngModel.$viewValue || "")
        const placeholder = ngModel.editor.getExtensionByName("placeholder")
        if (placeholder) {
          placeholder.updatePlaceholder(iElement[0])
        }
      }

      ngModel.$isEmpty = (value) => {
        if (/[<>]/.test(value)) {
          return toInnerText(value).length === 0
        } else if (value) {
          return value.length === 0
        } else {
          return true
        }
      }

      ngModel.editor.subscribe("editableInput", (event, editable) => {
        ngModel.$setViewValue(editable.innerHTML.trim())
      })

      scope.$watch("bindOptions", (bindOptions) => {
        ngModel.editor.init(iElement, bindOptions)
      })

      scope.$on("$destroy", () => {
        ngModel.editor.destroy()
      })
    },
  }
})
