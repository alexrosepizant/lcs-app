export default function modalService($uibModal) {
  "ngInject"

  const modalDefaults = {
    backdrop: true,
    keyboard: true,
    modalFade: true,
    templateUrl: "app/common/modal/modal.html",
  }

  const modalOptions = {
    closeButtonText: "Annuler",
    actionButtonText: "OK",
    headerText: "Confirmation",
    bodyText: "Sur de vouloir faire ça?",
  }

  this.showModal = function(customModalDefaults, customModalOptions) {
    if (!customModalDefaults) customModalDefaults = {}
    customModalDefaults.backdrop = "static"
    return this.show(customModalDefaults, customModalOptions)
  }

  this.show = function(customModalDefaults, customModalOptions) {
        // Create temp objects to work with since we're in a singleton service
    const tempModalDefaults = {}
    const tempModalOptions = {}

        // Map angular-ui modal custom defaults to modal defaults defined in service
    angular.extend(tempModalDefaults, modalDefaults, customModalDefaults)

        // Map modal.html $scope custom properties to defaults defined in service
    angular.extend(tempModalOptions, modalOptions, customModalOptions)

    if (!tempModalDefaults.controller) {
      tempModalDefaults.controller = function($scope, $uibModalInstance) {
        $scope.modalOptions = tempModalOptions
        $scope.modalOptions.ok = function(result) {
          $uibModalInstance.close(result)
        }
        $scope.modalOptions.close = function() {
          $uibModalInstance.dismiss("cancel")
        }
      }
    }

    return $uibModal.open(tempModalDefaults).result
  }
}
