export default function VideoCreationCtrl($scope, $sce, ArticleFactory, Upload, Notification) {

  $scope.showError = false
  $scope.API = null
  $scope.article = {
    type: "video",
    url: "",
  }

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
          if (resp.data.err) {
            $scope.showError = true
          } else {
            $scope.showError = false
            $scope.article.url = resp.data.location
            $scope.testVideo()
          }
        }, null, (evt) => {
          const progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
          console.warn(progressPercentage)
        }).catch(() => {
          $scope.showError = true
        })
      }
    }
  }

  /**
  Video player
  **/
  $scope.config = {
    sources: [],
    tracks: [],
  }

  $scope.onPlayerReady = (API) => {
    $scope.API = API
  }

  $scope.testVideo = () => {
    $scope.API.stop()
    $scope.config.sources = [{
      src: $sce.trustAsResourceUrl($scope.article.url),
      type: "video/mp4",
    }]
  }

  /**
  Save / Cancel actions
  **/
  $scope.dismiss = () => {
    $scope.$dismiss()
  }

  $scope.create = () => {
    if (!$scope.article.title) {
      return Notification.warning({
        title: "Info",
        message: "Mets au moins un titre",
      })
    }

    ArticleFactory.createArticle($scope)
      .then(() => {
        $scope.$close(true)
        Notification.success({
          title: "Success",
          message: "Article créé avec succés",
        })
      })
      .catch(() => {
        Notification.error({
          title: "Error",
          message: "Erreur lors de la création de l'article",
        })
      })
  }
}
