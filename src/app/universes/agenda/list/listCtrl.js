export default function AgendaListCtrl($rootScope, $scope, $uibModal, AgendaFactory, events, Notification) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.events = events
  $scope.currentEvent = $scope.events[0]

  /**
  Utilities
  **/
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
      templateUrl: "app/universes/user/deletion/removeArticle.html",
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
    AgendaFactory.findUserEvents()
      .then((events) => {
        $scope.events = events
        $scope.currentEvent = $scope.events[0]
      })
  })
}
