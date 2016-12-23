// Import our css files
import "../assets/stylesheets/angular-lightbox.css"
import "../assets/stylesheets/bulma.css"
import "../assets/stylesheets/flatpickr.min.css"
import "../assets/stylesheets/medium-editor.css"
import "../assets/stylesheets/ngpopover.css"
import "../assets/stylesheets/style.css"
import "../assets/stylesheets/ui-bootstrap-custom-1.3.3-csp.css"
import "../assets/stylesheets/videogular.css"

// Import our angular libs
import angular from "angular"
import "angular-animate"
import "angular-ui-router"
import "angular-cookies"
import "angular-http-auth"
import "angular-resource"
import "angular-sanitize"
import "angularjs-scroll-glue"
import "angular-translate"
import "angular-translate-loader-static-files"
import "angular-ui-notification"
import "ng-file-upload"
import "videogular"
import "videogular-controls"
import "videogular-buffering"
import "./common/modules/videogular-youtube/index"
import "./common/modules/lightbox/angular-lightbox"
import "./common/modules/deckgrid/angular-deckgrid"
import "./common/modules/flatpickr"
import "./common/modules/medium-editor/angular-medium-editor"
import "./common/modules/popover"
import "./common/modules/ui-bootstrap/ui-bootstrap-custom-1.3.3.min"
import "./common/modules/ui-bootstrap/ui-bootstrap-custom-tpls-1.3.3"
import "./common/modules/utils"
import "./common/modules/category"
import "./common/modules/chat"
import "./common/modules/comment"
import "./common/modules/countdown"

// Import our app config files
import constants  from "./config/app.constants"
import appConfig  from "./config/app.config"
import appRun     from "./config/app.run"
import HeaderCtrl from "./common/header/headerCtrl"

// Import app component
import "./universes/about"
import "./universes/auth"
import "./universes/home"
import "./universes/user"
import "./universes/article"
import "./universes/agenda"
import "./universes/vote"

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
  "ui.bootstrap",
  "ui-notification",
  "angular-medium-editor",
  "angular-lightbox",
  "angular-flatpickr",
  "angular-popover",
  "akoenig.deckgrid",
  "luegg.directives",
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "info.vietnamcode.nampnq.videogular.plugins.youtube",
  "app.utils",
  "app.about",
  "app.auth",
  "app.category",
  "app.chat",
  "app.comment",
  "app.countdown",
  "app.home",
  "app.article",
  "app.user",
  "app.agenda",
  "app.vote",
]

// Mount on window for testing
window.app = angular.module("app", requires)

angular.module("app").constant("AppConstants", constants)
angular.module("app").config(appConfig)
angular.module("app").run(appRun)
angular.module("app").controller("HeaderCtrl", HeaderCtrl)

angular.bootstrap(document, ["app"])
