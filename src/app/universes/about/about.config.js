export default function AboutConfig($stateProvider) {
  $stateProvider
    .state("about", {
      url: "/about",
      template: require("./list/list.html"),
      controller: "AboutListCtrl",
      title: "About",
      resolve: {
        issues: (IssueFactory) => {
          return IssueFactory.loadIssues()
        },
      },
    })
    .state("about.create", {
      parent: "about",
      url: "/create",
      onEnter: ($state, $uibModal) => {
        $uibModal.open({
          templateUrl: "app/universes/about/creation/create.html",
          controller: "CreateIssueCtrl",
          backdrop: "static",
          resolve: {
            issue: ($rootScope, Issue) => {
              return new Issue({
                user: $rootScope.currentUser,
              })
            },
          },
        }).result.finally(() => {
          $state.go("^")
        })
      },
    })
}
