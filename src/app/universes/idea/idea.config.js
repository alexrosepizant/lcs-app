export default function AgendaConfig($stateProvider) {
  $stateProvider
    .state("idea", {
      url: "/idea",
      template: require("./list/list.html"),
      controller: "IdeaListCtrl",
      title: "Idea",
      resolve: {
        ideas: (IdeaFactory) => {
          return IdeaFactory.loadIdeas()
        },
      },
    })
    .state("idea.create", {
      parent: "idea",
      url: "/create",
      onEnter: ($state, $uibModal) => {
        $uibModal.open({
          templateUrl: "app/universes/idea/creation/create.html",
          controller: "CreateIdeaCtrl",
          backdrop: "static",
          resolve: {
            idea: ($rootScope, Idea) => {
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
