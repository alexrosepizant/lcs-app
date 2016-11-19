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
          return VoteFactory.loadVotes(filter)
        },
        users: (UserFactory) => {
          return UserFactory.getUsers()
        },
        filter: ($stateParams) => {
          return ($stateParams.filter) ? $stateParams.filter : "all"
        },
      },
    })
    .state("vote.create", {
      url: "/vote/create",
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
