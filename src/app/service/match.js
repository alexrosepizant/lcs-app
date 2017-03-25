import euroRessources from "../../assets/euro/euroRessources.json"

export default function MatchFactory($http, Match) {
  "ngInject"

  const BASE_URL = "match"

  return {
    teams: euroRessources.teams,
    types: euroRessources.types,

    findMatchs() {
      return $http.get(`/${BASE_URL}`)
        .then((matchs) => {
          return matchs.data.map((match) => new Match(match))
        })
    },

    getMatch(matchId) {
      return $http.get(`/${BASE_URL}/${matchId}`)
        .then((match) => {
          return new Match(match.data)
        })
    },

    createMatch(match) {
      return $http.post(`/${BASE_URL}`, match)
    },

    update(match) {
      return $http.put(`/${BASE_URL}/${match._id}`, match)
        .then((match) => {
          return new Match(match.data)
        })
    },

    deleteMatch(match) {
      return $http.delete(`/${BASE_URL}/${match._id}`)
    },

    getTeamName(code) {
      if (!code) {
        return ""
      }
      return this.teams.find((country) => country.code === code).name
    },

    getFormattedType(code) {
      if (!code) {
        return ""
      }
      return this.types.find((country) => country.code === code).name
    },
  }
}
