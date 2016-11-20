export default function ParameterFactory($http) {
  return {
    getParameters() {
      $http.get("/parameters")
    },

    updateParameters(parameters) {
      $http.put("/parameters", parameters)
    },
  }
}
