export default function AgendaListCtrl($rootScope, $scope, AgendaFactory, events, Notification) {
  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.events = events
  $scope.currentEvent = $scope.events[0]

  /**
  Flatpick config
  **/
  $scope.startsAt = $scope.currentEvent.startsAt
  $scope.dateOpts = {
    utc: true,
    minDate: new Date(),
    time_24hr: true,

    // create an extra input solely for display purposes
    altInput: true,
    altFormat: "j F Y",
  }

  $scope.datePostSetup = (fpItem) => {
    fpItem.set("onChange", (dateObject, dateString) => {
      console.warn(dateString)
      $scope.fpVal = dateString
    })
  }

  /**
  Utilities
  **/
  $scope.addUserToArray = (array) => {
    if ($scope.currentEvent[array].map((user) => user._id).indexOf($scope.currentUser._id)) {
      $scope.currentEvent[array].push({
        _id: $scope.currentUser._id,
      })
    }
  }

  $scope.removeUserOfArray = (array) => {
    const index = $scope.currentEvent[array].map((user) => user._id)
    if (index !== -1) {
      $scope.currentEvent[array].splice(index, 1)
    }
  }

  /**
  User status management for event
  **/
  $scope.isAvailableForEvent = () => {
    $scope.addUserToArray("guest")
    $scope.removeUserOfArray("guestUnavailable")
    $scope.updateEvent({
      title: "Success",
      message: "On t'attends!!",
    })
  }

  $scope.isUnavailableForEvent = () => {
    $scope.addUserToArray("guestUnavailable")
    $scope.removeUserOfArray("guest")
    $scope.updateEvent({
      title: "Success",
      message: "Personne voulait que tu vienne de toute façon :)",
    })
  }

  $scope.updateEvent = (message) => {
    AgendaFactory.updateUserEvent($scope.currentEvent)
      .then((userEvent) => {
        $scope.currentEvent = userEvent
        Notification.success(message)
      })
      .catch(() => {
        Notification.error("Petit soucis pendant la mise à jour de l'évènement")
      })
  }

  $scope.$on("updateAgendaList", () => {
    AgendaFactory.findUserEvents()
      .then((events) => $scope.events = events)
  })
}
