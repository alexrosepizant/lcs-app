export default function AgendaConfig($stateProvider) {
  $stateProvider
    .state("agenda", {
      url: "/agenda",
      template: require("./list/list.html"),
      controller: "AgendaListCtrl",
      title: "Agenda",
      resolve: {
        events: (AgendaFactory) => {
          return AgendaFactory.findUserEvents()
        },
      },
    })
    .state("agenda.create", {
      parent: "agenda",
      url: "/create",
      onEnter: ($state, $uibModal) => {
        $uibModal.open({
          templateUrl: "app/universes/agenda/creation/create.html",
          controller: "CreateEventCtrl",
          backdrop: "static",
        }).result.finally(() => {
          $state.go("^")
        })
      },
    })
}
