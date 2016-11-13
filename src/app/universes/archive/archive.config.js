export default function AgendaConfig($stateProvider) {
  $stateProvider
    .state("archive", {
      url: "/archive",
      template: require("./list/list.html"),
      controller: "ArchiveListCtrl",
      title: "Archive",
    })
}
