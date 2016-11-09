// Import our css files
import "../assets/stylesheets/style.css"
import "../assets/stylesheets/bulma.css"
import "../assets/stylesheets/ngpopover.css"
import "../assets/stylesheets/videogular.css"

// Import our angular libs
import angular from "angular"
import "angular-ui-router"
import "angular-cookies"
import "angular-http-auth"
import "angular-resource"
import "angular-sanitize"
import "ng-file-upload"
import "videogular"
import "videogular-controls"
import "videogular-ima-ads"
import "videogular-poster"
import "videogular-buffering"
// import "angular-route"
// import "angular-translate-loader-static-files"

// Import our app config files
import constants  from "./config/app.constants"
import appConfig  from "./config/app.config"
import appRun     from "./config/app.run"
import GlobalFactory from "./api/global"
import HeaderCtrl from "./common/header/headerCtrl"

// Import commons
import "./common/popover"

// Import app component
import "./universes/auth"
import "./universes/home"
import "./universes/user"
import "./universes/article"

// Create and bootstrap application
const requires = [
  "ui.router",
  // "angular-route", // for pascalprecht translator
  "http-auth-interceptor",
  "ngCookies",
  "ngResource",
  "ngSanitize",
  "ngFileUpload",
  "ngPopover",
  // "pascalprecht.translate",
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.poster",
  "app.auth",
  "app.home",
  "app.user",
  "app.article",
]

// Mount on window for testing
window.app = angular.module("app", requires)

angular.module("app").constant("AppConstants", constants)

angular.module("app").config(appConfig)

angular.module("app").run(appRun)

angular.module("app").factory("GlobalFactory", GlobalFactory)
angular.module("app").controller("HeaderCtrl", HeaderCtrl)

angular.bootstrap(document, ["app"])
