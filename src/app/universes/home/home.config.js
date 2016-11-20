export default function HomeConfig($stateProvider) {

  $stateProvider
    .state("home", {
      url: "/home",
      template: require("./chat/chat.html"),
      controller: "ChatCtrl",
      title: "Accueil",
      resolve: {
        messages: (ChatFactory) => {
          return ChatFactory.findMessages()
        },
        users: (UserFactory) => {
          return UserFactory.findUsers()
        },
      },
    })
}
