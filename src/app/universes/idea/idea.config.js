export default function AgendaConfig($stateProvider) {
  $stateProvider
    .state("idea", {
      url: "/idea",
      template: require("./list/list.html"),
      controller: "IdeaListCtrl",
      title: "Idea",
    })
}
