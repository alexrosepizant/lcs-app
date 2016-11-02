export default function ParameterFactory($http) {

  function getParameters($scope) {
    $http.get("/parameters").success((parameters) => {
      $scope.parameters = parameters
    })
  }

  function updateParameters($scope, parameters) {
    $http.put("/parameters", parameters).success(() => {
      console.warn("Parameters successfully updated")
    })
  }

  return {
    getParameters,
    updateParameters,
  }
}
