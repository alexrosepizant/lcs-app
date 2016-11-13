// Import our css files
import "../assets/stylesheets/style.css"
import "../assets/stylesheets/bulma.css"
import "../assets/stylesheets/ngpopover.css"
import "../assets/stylesheets/videogular.css"
import "../assets/stylesheets/ui-bootstrap-custom-1.3.3-csp.css"

// Import our angular libs
import angular from "angular"
import "angular-ui-router"
import "angular-cookies"
import "angular-http-auth"
import "angular-resource"
import "angular-sanitize"
import "angular-animate"
import "angular-translate"
import "angular-translate-loader-static-files"
import "ng-file-upload"
import "videogular"
import "videogular-controls"
import "videogular-ima-ads"
import "videogular-poster"
import "videogular-buffering"

// Import our app config files
import constants  from "./config/app.constants"
import appConfig  from "./config/app.config"
import appRun     from "./config/app.run"
import GlobalFactory from "./factory/api/global"
import HeaderCtrl from "./common/header/headerCtrl"

// Import commons
import "./common/popover"
import "./common/ui-bootstrap/ui-bootstrap-custom-1.3.3.min"
import "./common/ui-bootstrap/ui-bootstrap-custom-tpls-1.3.3"

// Import app component
import "./universes/auth"
import "./universes/home"
import "./universes/user"
import "./universes/article"
import "./universes/agenda"
import "./universes/vote"
import "./universes/idea"
import "./universes/archive"

// Create and bootstrap application
const requires = [
  "ui.router",
  "http-auth-interceptor",
  "ngCookies",
  "ngResource",
  "ngSanitize",
  "ngAnimate",
  "pascalprecht.translate",
  "ngFileUpload",
  "ngPopover",
  "ui.bootstrap",
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.poster",
  "app.auth",
  "app.home",
  "app.user",
  "app.article",
  "app.agenda",
  "app.vote",
  "app.idea",
  "app.archive",
]

// Mount on window for testing
window.app = angular.module("app", requires)

angular.module("app").constant("AppConstants", constants)

angular.module("app").config(appConfig)

angular.module("app").run(appRun)

angular.module("app").factory("GlobalFactory", GlobalFactory)
angular.module("app").controller("HeaderCtrl", HeaderCtrl)

angular.bootstrap(document, ["app"])
