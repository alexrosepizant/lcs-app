angular.module("angular-lightbox", []).directive("lightbox", ($compile) => {
  "ngInject"

  return {
    restrict: "A",
    scope: {
      images: "=lightbox",
    },
    link(scope, element, attrs) {
      element.bind("click", (evt) => {

        evt.preventDefault()
        evt.stopPropagation()

        // If ctrl key or middle button pressed
        if (evt.ctrlKey || evt.which === 2) {
          window.open(this.href, "_blank")
        } else {

          // Build DOM
          const dom = $compile(
            "<div class=\"angular-lightbox-overlay\"><div class=\"angular-lightbox-inner\">" +
            "<span>" +
            "<a href class=\"previous\" title=\"Previous\" ng-click=\"showPrevious()\">«</a>" +
            "<img src=\"\" />" +
            "<a href class=\"next\" title=\"Next\" ng-click=\"showNext()\">»</a>" +
            "<a href class=\"close\" title=\"Close\" ng-click=\"close()\">×</a>" +
            "</span>" +
            "</div>" +
            "</div>"
          )(scope)

          scope.dom = dom
          scope.image = dom.find("img")[0]
          element.after(scope.dom)

          scope.getItemCount()
          scope.loadImageAt(attrs.index, element.attr("href"))

          // Handle keyboard shortcuts
          scope.onKeyDown = (e) => {
            switch (e.which) {
            case 37: // Left arrow
              scope.showPrevious()
              break
            case 39: // Right arow
              scope.showNext()
              break
            case 36: // Home
              scope.loadImageAt(0)
              break
            case 35: // End
              scope.loadImageAt(scope.images.length - 1)
              break
            case 27: // Escape
              scope.dom.remove()
              break
            }
          }
        }

        return false
      })

      /**
      * Load image at given index
      */
      scope.loadImageAt = (index, href) => {
        scope.currentIndex = parseInt(index)

        const img = new Image()
        const inner = angular.element(scope.dom).find("span")

        img.onload = function() {
          inner[0].replaceChild(this, scope.image)
          scope.image = this
        }

        img.onerror = function() {
          inner[0].replaceChild(this, scope.image)
          scope.image = this
        }

        img.title = scope.currentIndex + "/" + scope.itemCount
        img.src = href // Trigger image loading
        img.alt = href
      }

      /**
      * Display previous image in scope.images
      */
      scope.showPrevious = () => {
        if (scope.currentIndex - 1 > -1) {
          scope.currentIndex --
          scope.loadImageAt(scope.currentIndex,
            angular.element(element.parent().parent().parent().find("a")[scope.currentIndex]).attr("href"))
        }
      }

      /**
      * Display next image in scope.images
      */
      scope.showNext = () => {
        if (scope.currentIndex + 1 < scope.itemCount) {
          scope.currentIndex ++
          scope.loadImageAt(scope.currentIndex,
          angular.element(element.parent().parent().parent().find("a")[scope.currentIndex + 3]).attr("href"))
        }
      }

      scope.close = () => {
        angular.element(scope.dom).remove()
      }

      scope.getItemCount = () => {
        scope.itemCount = angular.element(element.parent().parent().parent().find("a")).length - 3
      }
    },
  }
})