export default function VideoCreationCtrl($scope, $sce, ArticleFactory, Upload) {

  $scope.showError = false
  $scope.API = null
  $scope.url = ""

  $scope.$watch("file", function() {
    if ($scope.file !== null) {
      $scope.files = [$scope.file]
    }
  })
  $scope.log = ""

  $scope.upload = function(files) {
    if (files && files.length) {
      const file = files[0]
      if (!file.$error) {
        Upload.upload({
          url: "/upload/video",
          data: {
            username: $scope.username,
            file: file,
          },
        }).then(function(resp) {
          $scope.url = resp.data.location
          $scope.testVideo()
        }, null, function(evt) {
          const progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
          console.warn(progressPercentage)
        })
      }
    }
  }

  $scope.onPlayerReady = function(API) {
    $scope.API = API
  }

  $scope.config = {
    sources: [
      {
        src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"),
        type: "video/mp4",
      },
      {
        src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"),
        type: "video/webm",
      },
      {
        src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"),
        type: "video/ogg",
      },
    ],
    tracks: [
      {
        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
        kind: "subtitles",
        srclang: "en",
        label: "English",
        default: "",
      },
    ],
    plugins: {
      poster: "http://www.videogular.com/assets/images/videogular.png",
    },
  }

  $scope.testVideo = function() {
    $scope.API.stop()
    $scope.config.sources = [{
      src: $sce.trustAsResourceUrl($scope.url),
      type: "video/mp4",
    }]
    $scope.API.play()
  }

  $scope.onError = function(evt) {
    console.warn(evt)
    $scope.showError = true
  }

  $scope.create = function() {
    ArticleFactory.create($scope.article)
  }
}
