"use strict"

export default {
  template: require("./thumbnail.html"),
  controllerAs: "$ctrl",
  bindings: {
    user: "<",
    dimension: "<?",
  },
}
