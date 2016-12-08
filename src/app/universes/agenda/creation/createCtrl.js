export default function CreateEventCtrl($rootScope, $scope, AgendaFactory, Notification) {

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser

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

  $scope.dismiss = function() {
    $scope.$dismiss()
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
        $rootScope.$broadcast("updateAgendaList")
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
