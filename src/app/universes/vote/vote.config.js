export default function AgendaConfig($stateProvider) {
  $stateProvider
    .state("vote", {
      url: "/vote?filter",
      template: require("./list/list.html"),
      controller: "VoteListCtrl",
      title: "Vote",
      resolve: {
        votes: ($stateParams, VoteFactory) => {
          const filter = ($stateParams.filter) ? $stateParams.filter : "all"
          return VoteFactory.findVotes(filter)
        },
        users: (UserFactory) => {
          return UserFactory.findUsers()
        },
        filter: ($stateParams) => {
          return ($stateParams.filter) ? $stateParams.filter : "all"
        },
      },
    })
    .state("vote.create", {
      parent: "vote",
      url: "/create",
      onEnter: ["$state", "$uibModal", function($state, $uibModal) {
        $uibModal.open({
          templateUrl: "app/universes/vote/creation/create.html",
          controller: "VoteCreationCtrl",
          backdrop: "static",
        }).result.finally(function() {
          $state.go("^")
        })
      }],
    })
}
