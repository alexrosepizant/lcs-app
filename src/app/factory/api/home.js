export default function HomeFactory($http, Article) {
  return {
    getUserDatas() {
      return $http.get("/home")
        .then((result) => {
          const datas = result.data
          datas.article = new Article(datas.article)
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
