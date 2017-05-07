export default function AgendaConfig($stateProvider) {
  "ngInject"

  $stateProvider
    .state("vote", {
      url: "/vote",
      abstract: "true",
      template: "<div ui-view></div>",
    })
    .state("vote.view", {
      url: "/view?voteId",
      template: require("./list/list.html"),
      controller: "VoteListCtrl",
      resolve: {
        votes: ($stateParams, VoteFactory) => {
          return VoteFactory.findVotes("all")
        },
        users: (UserFactory) => {
          return UserFactory.findUsersByVoteCount()
        },
        currentVote: ($stateParams, VoteFactory) => {
          return ($stateParams.voteId) ? VoteFactory.getVote($stateParams.voteId) : null
        },
      },
    })
    .state("vote.create", {
      parent: "vote.view",
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
