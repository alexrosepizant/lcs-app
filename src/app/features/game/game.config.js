export default function AboutConfig($stateProvider) {
  "ngInject"

  $stateProvider
    .state("euro", {
      url: "/euro",
      template: require("./euro/list/list.html"),
      controller: "EuroListCtrl",
      resolve: {
        matchs: (MatchFactory) => {
          return MatchFactory.findMatchs()
        },
        users: (UserFactory) => {
          return UserFactory.findUsers()
        },
      },
    })
    .state("euro.rules", {
      parent: "euro",
      url: "/rules",
      onEnter: ($state, $uibModal) => {
        $uibModal.open({
          template : require("./euro/rules/rules.html"),
          controller: "EuroRulesCtrl",
          backdrop: "static",
        }).result.finally(() => {
          $state.go("^")
        })
      },
    })
    .state("euro.bets", {
      parent: "euro",
      url: "/bets?matchId",
      onEnter: ($state, $stateParams, $uibModal) => {
        $uibModal.open({
          template : require("./euro/detail/detail.html"),
          controller: "EuroDetailCtrl",
          backdrop: "static",
          resolve: {
            match: (MatchFactory) => {
              return MatchFactory.getMatch($stateParams.matchId)
            },
          },
        }).result.finally(() => {
          $state.go("^")
        })
      },
    })
    .state("rank", {
      parent:"euro",
      url: "/rank",
      onEnter: ($state, $stateParams, $uibModal) => {
        $uibModal.open({
          template : require("./euro/rank/rank.html"),
          controller: "EuroRankCtrl",
          backdrop: "static",
          resolve: {
            users: (UserFactory) => {
              return UserFactory.findUsers()
            },
          },
        }).result.finally(() => {
          $state.go("^")
        })
      },
    })
    .state("score", {
      url: "/score",
      template: require("./euro/score/score.html"),
      controller: "EuroScoreCtrl",
      resolve: {
        matchs: (MatchFactory) => {
          return MatchFactory.findMatchs()
        },
      },
    })
}
