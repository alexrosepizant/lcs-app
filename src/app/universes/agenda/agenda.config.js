export default function AgendaConfig($stateProvider) {
  $stateProvider
    .state("agenda", {
      url: "/agenda",
      template: require("./list/list.html"),
      controller: "AgendaListCtrl",
      title: "Agenda",
    })
}
