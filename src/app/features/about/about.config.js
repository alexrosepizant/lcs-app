export default function AboutConfig($stateProvider) {
  "ngInject"

  $stateProvider
    .state("about", {
      url: "/about",
      template: require("./list/list.html"),
      controller: "AboutListCtrl",
      title: "About",
      resolve: {
        ideas: (IdeaFactory) => {
          return IdeaFactory.loadIdeas()
        },
      },
    })
    .state("about.create", {
      parent: "about",
      url: "/create",
      onEnter: ($state, $uibModal) => {
        $uibModal.open({
          templateUrl: "./creation/create.html",
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
}
