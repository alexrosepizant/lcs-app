angular.module("angular-popover", []).directive("angularPopover", ($window) => {
  "ngInject"

  return {
    restrict: "A",
    transclude: true,
    scope: true,
    template:
    "<div class=\"angular-popover-container\"><div class=\"angular-popover hide-popover-element\">" +
    "<div ng-if=\"isTemplateUrl()\" ng-include=\"getContentPopover()\" class=\"angular-popover-template\"></div>" +
    "<div ng-if=\"!isTemplateUrl()\" class=\"angular-popover-template\"></div></div>" +
    "<div class=\"angular-popover-triangle hide-popover-element\" ng-class=\"getTriangleClass()\"></div></div>" +
    "<ng-transclude></ng-transclude>",
    link(scope, element, attrs) {

      const elementPositionProperty = $window.getComputedStyle(element[0]).position
      if (elementPositionProperty === "static") {
        element[0].style.position = "relative"
      }

      // the root div of the popup template
      const popoverContainer = element[0].querySelector(".angular-popover-container")
      let  popover
      let  parentHeight // height of the element to which the directive is attached
      let parentWidth // width of the element to which the directive is attached
      let popoverHeight // height of the popover
      let  popoverWidth // width of the popover
      let  triangle // the small triangle attached with the popover
      const triangleDivSide = 15 // side of the triangle
      const triangleRectDivSide = 30 // the div which has been rotated to make a triangle using the after pseudo class

      const triangleHeight = Math.sqrt(triangleDivSide * triangleDivSide / 2)
      const mode = attrs.mode || "click"
      const closeOnClick = attrs.closeOnClick === undefined ?
      (mode === "click" ? true : false) : (attrs.closeOnClick === "true")

      const closeOnMouseleave = attrs.closeOnMouseleave === undefined ? (mode === "mouseover" ? true : false) :
      (attrs.closeOnMouseleave === "true")

      const createPopover = function() {
        if (attrs.template) {
          const templateElement = element[0].querySelector(".angular-popover-template")
          templateElement.innerHTML = attrs.template
        }

        if (attrs.backgroundColor) {
          popover.style["background-color"] = attrs.backgroundColor
        }

        if (attrs.textColor) {
          popover.style.color = attrs.textColor
        }

        if (attrs.padding) {
          popover.style.padding = attrs.padding
        }

        popoverHeight = popover.clientHeight
        popoverWidth = popover.clientWidth

        // check direction and calculate position for appending popover and triangle
        switch (attrs.direction) {
        case "top" :
          popover.style.top = (-parentHeight - popoverHeight - triangleHeight) + "px"
          popover.style.left = ((parentWidth - popoverWidth)/2) + "px"
          triangle.style.top = (-parentHeight - triangleHeight) + "px"
          triangle.style.left = ((parentWidth - triangleRectDivSide)/2) + "px"
          break

        case "bottom":
          popover.style.top = triangleHeight + "px"
          popover.style.left = ((parentWidth - popoverWidth)/2) + "px"
          triangle.style.top = -(triangleRectDivSide - triangleHeight) + "px"
          triangle.style.left = ((parentWidth - triangleRectDivSide)/2) + "px"
          break

        case "right":
          popover.style.top = ((parentHeight - popoverHeight)/2 - parentHeight) + "px"
          popover.style.left = parentWidth + triangleHeight + "px"
          triangle.style.top = ((parentHeight - triangleRectDivSide)/2 - parentHeight) + "px"
          triangle.style.left = (parentWidth - (triangleRectDivSide - triangleHeight)) + "px"
          break

        case "left":
          popover.style.top = ((parentHeight - popoverHeight)/2 - parentHeight) + "px"
          popover.style.right = triangleHeight + "px"
          triangle.style.top = ((parentHeight - triangleRectDivSide)/2 - parentHeight) + "px"
          triangle.style.left = -triangleHeight + "px"
          break
        }
      }

      // return the path of the popover template
      scope.getContentPopover = function() {
        return attrs.templateUrl
      }

      scope.isTemplateUrl = function() {
        if (attrs.templateUrl) {
          return true
        }
        return false
      }

      // depending upon the direction specified, attached the appropriate class to the popover
      scope.getTriangleClass = function() {
        return "angular-popover-triangle-" + attrs.direction
      }


      if (closeOnMouseleave) {
        element[0].addEventListener("mouseleave", function() {
          popover.classList.add("hide-popover-element")
          triangle.classList.add("hide-popover-element")
        })
      }

      if (mode !== "click" && closeOnClick) {
        element[0].addEventListener("click", function() {
          popover.classList.add("hide-popover-element")
          triangle.classList.add("hide-popover-element")
        })
      }

      // listen for click on the directive element
      element[0].addEventListener(mode, function() {
        parentHeight = element[0].clientHeight

        // move the popover container to the bottom of the directive element
        popoverContainer.style.top = parentHeight + "px"
        parentWidth = element[0].clientWidth
        popover = element[0].querySelector(".angular-popover")
        triangle = element[0].querySelector(".angular-popover-triangle")

        if (mode === "click" && closeOnClick) {
          popover.classList.toggle("hide-popover-element")
          triangle.classList.toggle("hide-popover-element")
          popoverContainer.classList.toggle("popover-animation")
          popoverContainer.classList.toggle("popover-floating-animation-" + attrs.direction)
        }      else if (mode === "click" && !closeOnClick) {
          popover.classList.remove("hide-popover-element")
          triangle.classList.remove("hide-popover-element")
          popoverContainer.classList.add("popover-animation")
          popoverContainer.classList.add("popover-floating-animation-" + attrs.direction)
        }  else if (popover.classList.contains("hide-popover-element")) {
          popover.classList.remove("hide-popover-element")
          triangle.classList.remove("hide-popover-element")
          popoverContainer.classList.add("popover-animation")
          popoverContainer.classList.add("popover-floating-animation-" + attrs.direction)
        }

        if (!popover.classList.contains("hide-popover-element")) {
          createPopover()
        }
      })
    },
  }
})
