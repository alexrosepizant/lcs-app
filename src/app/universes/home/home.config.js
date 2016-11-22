export default function HomeConfig($stateProvider) {

  $stateProvider
    .state("home", {
      url: "/home",
      template: require("./home.html"),
      title: "Accueil",
    })
}
