export default function HomeConfig($stateProvider) {

  $stateProvider
    .state("home", {
      url: "/home",
      template: require("./chat/home.html"),
      controller: "HomeCtrl",
      title: "Accueil",
      resolve: {
        messages: (ChatFactory) => {
          return ChatFactory.getMessages()
        },
        users: (UserFactory) => {
          return UserFactory.getUsers()
        },
      },
    })
}
