export default function ParameterFactory($http) {
  "ngInject"

  const BASE_URL = "parameter"

  return {
    getParameters() {
      return $http.get(`/${BASE_URL}`)
        .then((resp) => {
          return resp.data[0]
        })
    },

    updateParameters(parameters) {
      return $http.put(`/${BASE_URL}`, parameters)
    },
  }
}
