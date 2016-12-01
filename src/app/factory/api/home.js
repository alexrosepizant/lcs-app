export default function HomeFactory($http, Article, GenericContent) {
  return {
    getUserDatas() {
      return $http.get("/home")
        .then((result) => {
          const datas = result.data
          datas.article = new Article(datas.article)
          datas.content = datas.content.map((gContent) => new GenericContent(gContent))
          return datas
        })
    },

    getUserDatasFromId(userId) {
      return $http.get("/home", {
        userId: userId,
      }).then((result) => {
        return result.data
      })
    },
  }
}
