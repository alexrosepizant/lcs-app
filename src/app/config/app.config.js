import moment from "moment"
import "moment/locale/fr"

function AppConfig($stateProvider, $locationProvider, $urlRouterProvider, $translateProvider,
    $qProvider, NotificationProvider) {
  "ngInject"

  $qProvider.errorOnUnhandledRejections(false)

  $urlRouterProvider.otherwise(($injector) => {
    const $state = $injector.get("$state")
    $state.go("article")
  })

  // Configure translate provider
  $translateProvider.useSanitizeValueStrategy("sanitize")
  $translateProvider.useStaticFilesLoader({
    prefix: "locales/translation_",
    suffix: ".json",
  })
  $translateProvider.use("fr")

  // Configure notifications
  NotificationProvider.setOptions({
    delay: 5000,
    startTop: 30,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: "center",
    positionY: "top",
  })

  // Configure moment
  moment.locale("fr")
}

export default AppConfig
