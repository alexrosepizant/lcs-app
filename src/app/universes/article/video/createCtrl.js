export default function VideoCreationCtrl($scope, $sce, ArticleFactory, Upload) {

  $scope.showError = false
  $scope.API = null
  $scope.url = ""

  /**
  Video upload
  **/
  $scope.$watch("file", () => {
    if ($scope.file !== null) {
      $scope.files = [$scope.file]
    }
  })

  $scope.upload = (files) => {
    if (files && files.length) {
      const file = files[0]
      if (!file.$error) {
        Upload.upload({
          url: "/upload/video",
          data: {
            username: $scope.username,
            file: file,
          },
        }).then((resp) => {
          $scope.url = resp.data.location
          $scope.testVideo()
        }, null, (evt) => {
          const progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
          console.warn(progressPercentage)
        })
      }
    }
  }

  /**
  Video player
  **/
  $scope.onPlayerReady = (API) => {
    $scope.API = API
  }

  $scope.config = {
    sources: [],
    tracks: [],
    plugins: {
      poster: "http://www.videogular.com/assets/images/videogular.png",
    },
  }

  $scope.testVideo = () => {
    $scope.API.stop()
    $scope.config.sources = [{
      src: $sce.trustAsResourceUrl($scope.url),
      type: "video/mp4",
    }]
    $scope.API.play()
  }

  $scope.onError = (evt) => {
    console.warn(evt)
    $scope.showError = true
  }

  /**
  Save / Cancel actions
  **/
  $scope.dismiss = () => {
    $scope.$dismiss()
  }

  $scope.create = () => {
    ArticleFactory.create($scope.article)
    $scope.$close(true)
  }
}
