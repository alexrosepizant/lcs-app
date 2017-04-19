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
import "angular-moment"
import "angular-translate"
import "angular-translate-loader-static-files"
import "angular-ui-notification"
import "babel-polyfill"
import "ng-file-upload"
import "videogular"
import "videogular-controls"
import "videogular-buffering"

// Import externals libs
import "./libs/videogular-youtube/index"
import "./libs/lightbox/angular-lightbox"
import "./libs/deckgrid/angular-deckgrid"
import "./libs/flatpickr"
import "./libs/medium-editor/angular-medium-editor"
import "./libs/popover"
import "./libs/ui-bootstrap/ui-bootstrap-custom-1.3.3.min"
import "./libs/ui-bootstrap/ui-bootstrap-custom-tpls-1.3.3"

// Import our app config files
import constants  from "./app.constants"
import appConfig  from "./app.config"
import appRun     from "./app.run"
import HeaderCtrl from "./common/header/headerCtrl"

// Import app common modules
import "./common/utils"
import "./common/chat"
import "./common/notification"
import "./common/comment"

// Import app features
import "./features/about"
import "./features/auth"
import "./features/user"
import "./features/article"
import "./features/article/category"
import "./features/agenda"
import "./features/game"
import "./features/vote"

// Create and bootstrap application
const requires = [
  "ui.router",
  "http-auth-interceptor",
  "ngCookies",
  "ngResource",
  "ngSanitize",
  "ngAnimate",
  "angularMoment",
  "pascalprecht.translate",
  "ngFileUpload",
  "ui.bootstrap",
  "ui-notification",
  "angular-medium-editor",
  "angular-lightbox",
  "angular-flatpickr",
  "angular-popover",
  "akoenig.deckgrid",
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "info.vietnamcode.nampnq.videogular.plugins.youtube",
  "app.about",
  "app.auth",
  "app.agenda",
  "app.article",
  "app.category",
  "app.chat",
  "app.comment",
  "app.game",
  "app.notification",
  "app.user",
  "app.utils",
  "app.vote",
]

// Mount on window for testing
window.app = angular.module("app", requires)

angular.module("app").constant("AppConstants", constants)
angular.module("app").config(appConfig)
angular.module("app").run(appRun)
angular.module("app").controller("HeaderCtrl", HeaderCtrl)

angular.bootstrap(document, ["app"])
