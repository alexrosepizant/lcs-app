;(function(angular) {
  "use strict"
  const app = angular.module("ngPopover", [])
  // Hides all popovers, skips the popover whose trigger Id is provided in the function call
  const hideAllPopovers = function(trigger) {
    let triggerId
    if (trigger)
      triggerId = trigger.getAttribute("id")
    const allPopovers = trigger !== undefined ?
    document.querySelectorAll(".ng-popover:not([trigger=\""+triggerId+"\"])") :
    document.querySelectorAll(".ng-popover")
    for (let i =0; i<allPopovers.length; i++) {
      const popover = allPopovers[i]
      if (!popover.classList.contains("hide"))
        popover.classList.add("hide")
    }
  }
  app.directive("ngPopover", function() {
    return {
      restrict: "EA",
      scope: {
        direction: "@",
        trigger: "@",
        onClose: "&",
        onOpen: "&",
        popoverClass: "@",
      },
      replace: true,
      transclude: true, // we want to insert custom content inside the directive
      link($scope, element, attrs, ctrl) {

        $scope.popoverClass = attrs.popoverClass
        $scope.dropDirection = attrs.direction || "bottom"

        const trigger = document.querySelector("#"+$scope.trigger)
        const target = document.querySelector(".ng-popover[trigger=\""+$scope.trigger+"\"]")

        const getTriggerOffset = function(triggerWidth) {

          const triggerRect = trigger.getBoundingClientRect()
          let left = triggerRect.left
          let top = triggerRect.top + document.body.scrollTop

          if (triggerRect.left + triggerWidth > document.querySelector("body .container").offsetWidth) {
            left += (document.querySelector("body .container").offsetWidth - triggerRect.left)
            left -= triggerWidth
            if ($scope.popoverClass === "popover-chat") {
              left -= 65
            }
          }

          if ($scope.popoverClass === "popover-chat") {
            top += 12
          }

          return {
            top: top,
            left: left,
          }
        }

        const calcPopoverPosition = function(trigger, target) {
          let left
          let top

          target.classList.toggle("hide")
          const targetWidth = target.offsetWidth
          const targetHeight = target.offsetHeight

          target.classList.toggle("hide")
          const triggerWidth = trigger.offsetWidth
          const triggerHeight = trigger.offsetHeight

          switch ($scope.dropDirection) {
          case "left":
            left = getTriggerOffset(triggerWidth).left - targetWidth - 10 + "px"
            top = getTriggerOffset(triggerWidth).top + "px"
            break

          case "right":
            left = getTriggerOffset(triggerWidth).left + triggerWidth + 10 + "px"
            top = getTriggerOffset().top + "px"
            break

          case "top":
            left = getTriggerOffset(triggerWidth).left + "px"
            top = getTriggerOffset(triggerWidth).top - targetHeight - 10 + "px"
            break

          default:
            left = getTriggerOffset(triggerWidth).left - targetWidth + triggerWidth + "px"
            top = getTriggerOffset(triggerWidth).top + triggerHeight + 10 + "px"
          }
          target.style.position = "absolute"
          target.style.left = left
          target.style.top = top
        }

        // Add click event listener to trigger
        trigger.addEventListener("click", function(ev) {
          const trigger = this // get trigger element
          const target =  document.querySelector(".ng-popover[trigger=\""+$scope.trigger+"\"]")
          ev.preventDefault()
          calcPopoverPosition(trigger, target) // calculate the position of the popover
          hideAllPopovers(trigger)
          target.classList.toggle("hide") // toggle display of target popover
          // if target popover is visible then add click listener to body and call the open popover callback
          if (!target.classList.contains("hide")) {
            ctrl.registerBodyListener()
            $scope.onOpen()
            $scope.$apply()
          } else {
            ctrl.unregisterBodyListener()
            $scope.onClose()
            $scope.$apply()
          }
        })

        // calculates the position of the popover
        calcPopoverPosition(trigger, target)
      },

      controller: ["$scope", function($scope) {
        // logic to hide popover on click of body
        const bodyListenerLogic = function(e) {
          let clickedElement = e.target
          let insidePopover = false
          do {
            if (clickedElement !== document
              && (clickedElement.classList && (clickedElement.classList.contains("ng-popover") ||
              clickedElement.classList.contains("ng-popover-trigger")))) {
              insidePopover = true
              break
            }
          } while ((clickedElement = clickedElement.parentNode))
          if (!insidePopover) {
            hideAllPopovers()
            document.body.removeEventListener("click", bodyListenerLogic)
            $scope.onClose()
            $scope.$apply()
          }
        }
        this.registerBodyListener = function() {
          document.body.addEventListener("click", bodyListenerLogic)
        }

        this.unregisterBodyListener = function() {
          document.body.removeEventListener("click", bodyListenerLogic)
        }
      }],
      template:
        "<div class=\"ng-popover hide\"><div class=\"ng-popover-wrapper {{dropDirection}}\">" +
        "<div class=\"ng-popover-content\" ng-class=\"popoverClass\"><ng-transclude></ng-transclude></div></div></div>",
    }
  })

  app.factory("ngPopoverFactory", function() {
    return {
      closePopover(trigger) {
        document.querySelector(".ng-popover[trigger="+trigger+"]").classList.add("hide")
      },
      closeAll() {
        const allPopovers = document.querySelectorAll(".ng-popover")
        for (let i=0; i<allPopovers.length; i++) {
          if (!allPopovers[i].classList.contains("hide"))
            allPopovers[i].classList.add("hide")
        }
      },
    }
  })

})(angular)
