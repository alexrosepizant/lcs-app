export default function AgendaConfig($stateProvider) {
  "ngInject"

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
          return UserFactory.findUsersByVoteCount()
        },
      },
    })
    .state("vote.create", {
      parent: "vote",
      url: "/create",
      onEnter: ($state, $uibModal) => {
        $uibModal.open({
          template : require("./creation/create.html"),
          controller: "VoteCreationCtrl",
          backdrop: "static",
          animation: false,
          resolve: {
            vote: ($rootScope, $stateParams, VoteFactory, Vote) => {
              return new Vote({
                user: $rootScope.currentUser._id,
              })
            },
          },
        }).result.finally(() => {
          $state.go("^")
        })
      },
    })
    .state("vote.update", {
      parent: "vote",
      url: "/update?voteId",
      onEnter: ($state, $stateParams, $uibModal) => {
        $uibModal.open({
          template : require("./creation/create.html"),
          controller: "VoteCreationCtrl",
          backdrop: "static",
          animation: false,
          resolve: {
            vote: (VoteFactory) => {
              return VoteFactory.getVote($stateParams.voteId)
            },
          },
        }).result.finally(() => {
          $state.go("^")
        })
      },
    })
}
