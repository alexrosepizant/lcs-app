export default function AgendaListCtrl($scope, AgendaFactory) {
  // Retrieve params
  AgendaFactory.loadUserEvents($scope)
  $scope.userEvent = {
  }

  /**
  Flatpick config
  **/
  $scope.dateOpts = {
    utc: true,
    minDate: new Date(),
    enableTime: true,
    time_24hr: true,

    // create an extra input solely for display purposes
    altInput: true,
    altFormat: "j F Y, H:i",
  }

  $scope.datePostSetup = function(fpItem) {
    console.log("flatpickr", fpItem)
  }
}
