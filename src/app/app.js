// Import our css files
import "../assets/stylesheets/style.css"
import "../assets/stylesheets/bulma.css"
import "../assets/stylesheets/ngpopover.css"
import "../assets/stylesheets/videogular.css"

// Import our angular libs
import angular from "angular"
import "angular-ui-router"
import "videogular"
import "videogular-controls"
import "videogular-ima-ads"
import "videogular-poster"
import "videogular-buffering"
import "ng-file-upload"

// Import our app config files
import constants  from "./config/app.constants"
import appConfig  from "./config/app.config"
import appRun     from "./config/app.run"
import GlobalFactory from "./api/global"
import GlobalCtrl from "./common/global"

// Import commons
import "./common/popover"

// Import app component
import "./universes/home"
import "./universes/user"
import "./universes/article"

// Create and bootstrap application
const requires = [
  "ui.router",
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.poster",
  "ngFileUpload",
  "app.home",
  "app.user",
  "app.article",
  "ngPopover",
]

// Mount on window for testing
window.app = angular.module("app", requires)

angular.module("app").constant("AppConstants", constants)

angular.module("app").config(appConfig)

angular.module("app").run(appRun)

angular.module("app").factory("GlobalFactory", GlobalFactory)
angular.module("app").controller("GlobalCtrl", GlobalCtrl)

angular.bootstrap(document, ["app"])
