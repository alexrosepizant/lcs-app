export default function AboutConfig($stateProvider) {
  "ngInject"

  $stateProvider
    .state("archive", {
      url: "/archive",
      template: require("./archive.html"),
      title: "Archive",
    })
}
