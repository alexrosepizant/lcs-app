export default function AgendaConfig($stateProvider) {
  "ngInject"

  $stateProvider
    .state("agenda", {
      url: "/agenda",
      abstract: "true",
      template: "<div ui-view></div>",
    })
    .state("agenda.view", {
      url: "/view?userEventId",
      template: require("./list/list.html"),
      controller: "AgendaListCtrl",
      title: "Agenda",
      resolve: {
        onGoingEvents: (AgendaFactory) => {
          return AgendaFactory.findOnGoingUserEvents()
        },
        pastEvents: (AgendaFactory) => {
          return AgendaFactory.findPastUserEvents()
        },
        userEvent: ($stateParams, AgendaFactory) => {
          return ($stateParams.userEventId) ? AgendaFactory.findOne($stateParams.userEventId) : null
        },
      },
    })
    .state("agenda.create", {
      parent: "agenda",
      url: "/create",
      onEnter: ($state, $uibModal) => {
        $uibModal.open({
          template : require("./creation/create.html"),
          controller: "CreateEventCtrl",
          backdrop: "static",
          resolve: {
            userEvent: ($rootScope, UserEvent) => {
              return new UserEvent({
                user: $rootScope.currentUser,
              })
            },
          },
        }).result.finally(() => {
          $state.go("^")
        })
      },
    })
    .state("agenda.update", {
      parent: "agenda",
      url: "/update?userEventId",
      onEnter: ($state, $stateParams, $uibModal) => {
        $uibModal.open({
          template : require("./creation/create.html"),
          controller: "CreateEventCtrl",
          backdrop: "static",
          resolve: {
            userEvent: (AgendaFactory) => {
              return AgendaFactory.findOne($stateParams.userEventId)
            },
          },
        }).result.finally(() => {
          $state.go("^")
        })
      },
    })
}
