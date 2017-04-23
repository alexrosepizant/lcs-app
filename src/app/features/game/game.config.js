export default function AboutConfig($stateProvider) {
  "ngInject"

  $stateProvider
    .state("games", {
      url: "/games",
      abstract: true,
      template:"<div ui-view></div>",
    })
    .state("games.euro", {
      url: "/euro",
      abstract: true,
      template: require("./euro/euro.html"),
    })
    .state("games.euro.team", {
      url: "/team",
      template: require("./euro/team/list.html"),
      controller: "EuroTeamCtrl",
      resolve: {
        matchs: (MatchFactory) => {
          return MatchFactory.findMatchs()
        },
        users: (UserFactory) => {
          return UserFactory.findUsers()
        },
      },
    })
    .state("games.euro.match", {
      url: "/match",
      template : require("./euro/match/list/list.html"),
      controller: "EuroMatchCtrl",
      resolve: {
        matchs: (MatchFactory) => {
          return MatchFactory.findMatchs()
        },
        users: (UserFactory) => {
          return UserFactory.findUsers()
        },
      },
    })
    .state("games.euro.rank", {
      url: "/rank",
      template : require("./euro/rank/rank.html"),
      controller: "EuroRankCtrl",
      resolve: {
        users: (UserFactory) => {
          return UserFactory.findUsers()
        },
      },
    })
    .state("games.euro.score", {
      url: "/score",
      template: require("./euro/score/score.html"),
      controller: "EuroScoreCtrl",
      resolve: {
        matchs: (MatchFactory) => {
          return MatchFactory.findEndedMatchs()
        },
        users: (UserFactory) => {
          return UserFactory.findUsers()
        },
      },
    })
    .state("games.euro.bets", {
      parent: "games.euro.match",
      url: "/bets?matchId",
      onEnter: ($state, $stateParams, $uibModal) => {
        $uibModal.open({
          template : require("./euro/match/detail/detail.html"),
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
}
