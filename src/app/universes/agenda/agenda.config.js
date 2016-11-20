export default function AgendaConfig($stateProvider) {
  $stateProvider
    .state("agenda", {
      url: "/agenda",
      template: require("./list/list.html"),
      controller: "AgendaListCtrl",
      title: "Agenda",
      resolve: {
        events: (AgendaFactory) => {
          return AgendaFactory.loadUserEvents()
        },
      },
    })
    .state("agenda.create", {
      url: "/agenda/create",
      onEnter: ["$state", "$uibModal", function($state, $uibModal) {
        $uibModal.open({
          templateUrl: "app/universes/agenda/creation/create.html",
          controller: "CreateEventCtrl",
          backdrop: "static",
        }).result.finally(function() {
          $state.go("^")
        })
      }],
    })
}
