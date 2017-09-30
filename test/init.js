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

// Import our app config files
import constants  from "../src/app/app.constants"
import appConfig  from "../src/app/app.config"
import appRun     from "../src/app/app.run"
import HeaderCtrl from "../src/app/common/header/headerCtrl"

// Import app common modules
import "../src/app/common/utils"
import "../src/app/common/chat"
import "../src/app/common/notification"
import "../src/app/common/comment"

// Import app features
import "../src/app/features/article"

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
  "app.article",
]

// Mount on window for testing
window.app = angular.module("app", requires)

angular.module("app").constant("AppConstants", constants)
angular.module("app").config(appConfig)
angular.module("app").run(appRun)
angular.module("app").controller("HeaderCtrl", HeaderCtrl)
