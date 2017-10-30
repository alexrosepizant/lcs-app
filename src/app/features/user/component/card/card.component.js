export default {
  template: require("./card.html"),
  controllerAs: "$ctrl",
  bindings: {
    userId: "<",
  },
  controller: ($rootScope, $scope, UserFactory) => {
    "ngInject"

    UserFactory.getUser($scope.$ctrl.userId)
        .then((user) => {
          $scope.user = user
        })
  },
}
