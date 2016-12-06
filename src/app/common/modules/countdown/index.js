(function() {
  angular.module("app.countdown", []).directive("countdown", [
    "Util",
    "$interval",
    function(Util, $interval) {
      return {
        restrict: "A",
        scope: {date: "@"},
        link(scope, element) {
          const future = new Date(scope.date)
          $interval(function() {
            const diff = Math.floor((future.getTime() - new Date().getTime()) / 1000)
            return element.text(Util.dhms(diff))
          }, 1000)
        },
      }
    },
  ]).factory("Util", [function() {
    return {
      dhms(t) {
        const days = Math.floor(t / 86400)
        t -= days * 86400
        const hours = Math.floor(t / 3600) % 24
        t -= hours * 3600
        const minutes = Math.floor(t / 60) % 60
        t -= minutes * 60
        const seconds = t % 60
        return [
          days + "j",
          hours + "h",
          minutes + "m",
          seconds + "s",
        ].join(" ")
      },
    }
  }])
}.call(this))
