export default function AgendaListCtrl($scope, AgendaFactory, events) {
  // Retrieve params
  $scope.events = events

  $scope.$on("updateAgendaList", () => {
    AgendaFactory.findUserEvents()
      .then((events) => $scope.events = events)
  })
}
