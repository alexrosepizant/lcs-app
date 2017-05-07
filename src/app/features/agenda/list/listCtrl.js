export default function AgendaListCtrl($rootScope, $scope, $uibModal,
  AgendaFactory, pastEvents, onGoingEvents, userEvent, Notification) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.pastEvents = pastEvents
  $scope.onGoingEvents = onGoingEvents

  /**
  Utilities
  **/
  $scope.selectFistEvent = () => {
    $scope.currentEvent = userEvent || $scope.onGoingEvents[0] || $scope.pastEvents[0]
  }

  $scope.setCurrentEvent = (userEvent) => {
    $scope.currentEvent = userEvent
  }

  $scope.addUserToArray = (array) => {
    if ($scope.currentEvent[array].map((user) => user._id).indexOf($scope.currentUser._id) === -1) {
      $scope.currentEvent[array].push({
        _id: $scope.currentUser._id,
      })
    }
  }

  $scope.removeUserOfArray = (array) => {
    const index = $scope.currentEvent[array].map((user) => user._id).indexOf($scope.currentUser._id)
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
      title: "Grand success",
      message: "On t'attends!!",
    })
  }

  $scope.isUnavailableForEvent = () => {
    $scope.addUserToArray("guestUnavailable")
    $scope.removeUserOfArray("guest")
    $scope.updateEvent({
      title: "Grand success",
      message: "Personne voulait que tu vienne de toute façon :)",
    })
  }

  $scope.updateEvent = (message) => {
    AgendaFactory.update($scope.currentEvent)
      .then((userEvent) => {
        $scope.currentEvent = userEvent
        Notification.success(message)
      })
      .catch(() => {
        Notification.error("Petit soucis pendant la mise à jour de l'évènement")
      })
  }

  $scope.remove = (userEventId) => {
    $uibModal.open({
      templateUrl: "app/features/user/deletion/removeContent.html",
      controller: "RemoveContentCtrl",
      resolve: {
        contentId: () => {
          return userEventId
        },
        type: () => {
          return "agenda"
        },
      },
    })
  }

  $scope.$on("updateAgendaList", () => {
    AgendaFactory.findOnGoingUserEvents()
      .then((onGoingEvents) => {
        $scope.onGoingEvents = onGoingEvents
        return AgendaFactory.findPastUserEvents()
      })
      .then((pastEvents) => {
        $scope.pastEvents = pastEvents
      })
      .then(() => {
        $scope.selectFistEvent()
      })
  })

  $scope.selectFistEvent()
}
