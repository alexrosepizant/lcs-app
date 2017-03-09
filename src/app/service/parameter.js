export default function ParameterFactory($http) {
  "ngInject"

  return {
    getParameters() {
      return $http.get("/parameters")
        .then((resp) => {
          return resp.data[0]
        })
    },

    updateParameters(parameters) {
      return $http.put("/parameters", parameters)
    },
  }
}
