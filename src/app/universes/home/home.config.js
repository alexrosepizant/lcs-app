export default function HomeConfig($stateProvider) {
  $stateProvider
    .state("home", {
      url: "/home",
      template: require("./dashboard/home.html"),
      controller: "HomeCtrl",
      title: "Accueil",
      resolve: {
        datas: (HomeFactory) => {
          return HomeFactory.getUserDatas()
        },
        users: (UserFactory) => {
          return UserFactory.findUsers()
        },
      },
    })
}
