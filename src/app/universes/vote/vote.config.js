export default function AgendaConfig($stateProvider) {
  $stateProvider
    .state("vote", {
      url: "/vote",
      template: require("./list/list.html"),
      controller: "VoteListCtrl",
      title: "Vote",
    })
}
