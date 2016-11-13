export default function ParameterFactory($http) {
  return {
    getParameters($scope) {
      $http.get("/parameters")
        .then((parameters) => {
          $scope.parameters = parameters
        })
    },

    updateParameters($scope, parameters) {
      $http.put("/parameters", parameters)
        .then(() => {
          console.warn("Parameters successfully updated")
        })
    },
  }
}
