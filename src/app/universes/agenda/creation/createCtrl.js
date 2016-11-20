export default function CreateEventCtrl($scope, AgendaFactory, Notification) {
  // Retrieve params
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

  $scope.datePostSetup = (fpItem) => {
    console.log("flatpickr", fpItem)
  }

  // Save function
  $scope.create = () => {
    if (!$scope.userEvent.title) {
      return Notification.warning({
        title: "Info",
        message: "Mets au moins un titre",
      })
    }

    AgendaFactory.createUserEvent($scope.userEvent)
      .then(() => {
        $scope.$close(true)
        Notification.success({
          title: "Success",
          message: "Evènement créé avec succés",
        })
      })
      .catch(() => {
        Notification.error({
          title: "Error",
          message: "Erreur lors de la création de l'évènement",
        })
      })
  }
}
