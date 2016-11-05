export default function UserConfig($stateProvider) {
  $stateProvider
    .state("profile", {
      url: "/profile",
      template: require("./profile/profile.html"),
      controller: "ProfileCtrl",
      title: "Profile",
    })
}
