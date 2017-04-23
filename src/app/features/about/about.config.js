export default function AboutConfig($stateProvider) {
  "ngInject"

  $stateProvider
    .state("about", {
      url: "/about",
      abstract: true,
      template: require("./page.html"),
    })
    .state("about.issue", {
      url: "/issue",
      template: require("./list/list.html"),
      controller: "AboutListCtrl",
      resolve: {
        ideas: (IdeaFactory) => {
          return IdeaFactory.loadIdeas()
        },
      },
    })
    .state("about.issue.create", {
      parent: "about.issue",
      url: "/create",
      onEnter: ($state, $uibModal) => {
        $uibModal.open({
          template: require("./creation/create.html"),
          controller: "CreateIssueCtrl",
          backdrop: "static",
          resolve: {
            issue: ($rootScope, Idea) => {
              return new Idea({
                user: $rootScope.currentUser,
              })
            },
          },
        }).result.finally(() => {
          $state.go("^")
        })
      },
    })
    .state("about.changelog", {
      url: "/changelog",
      template: require("./changelog/changelog.html"),
    })
}
