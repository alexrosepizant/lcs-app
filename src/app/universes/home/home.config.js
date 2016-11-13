export default function HomeConfig($stateProvider) {

  $stateProvider
    .state("home", {
      url: "/",
      template: require("./home.html"),
      controller: "HomeCtrl",
      title: "Accueil",
    })
}
