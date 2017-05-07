export default function CreateEventCtrl($rootScope, $scope, AgendaFactory, Notification, userEvent) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.userEvent = userEvent

  /**
  Flatpick config
  **/
  $scope.dateOpts = {
    utc: true,
    minDate: new Date(),
    time_24hr: true,
    defaultDate: userEvent.startsAt,

    // create an extra input solely for display purposes
    altInput: true,
    altFormat: "j F Y",
  }

  $scope.dismiss = () => {
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
          title: "Grand success",
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
