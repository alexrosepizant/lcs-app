export default {
  template: require("./card.html"),
  controllerAs: "$ctrl",
  bindings: {
    userId: "@",
  },
  controller: ($rootScope, $scope, UserFactory) => {
    "ngInject"

    UserFactory.getUser("564ae6f3d4ff93480c7b7bae")
        .then((user) => {
          $scope.user = user
        })
  },
}
