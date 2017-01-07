export default function VideoCreationCtrl($rootScope, $scope, $sce, ArticleFactory, Upload, Notification, article) {
  "ngInject"

  // Retrieve params
  $scope.article = article

  // init varibles
  $scope.showError = false
  $scope.API = null
  $scope.article = article

  /**
  Video player config
  **/
  $scope.config = {
    sources: [],
    tracks: [],
  }

  $scope.onPlayerReady = (API) => {
    $scope.API = API
  }

  $scope.onError = (evt) => {
    console.warn("onError", evt)
  }

  $scope.testVideo = () => {
    $scope.API.stop()
    $scope.config.sources = [{
      src: $sce.trustAsResourceUrl($scope.article.url),
      type: "video/mp4",
    }]
  }

  /**
  Video upload config
  **/
  $scope.upload = () => {
    Upload.upload({
      url: "/upload/video",
      data: {
        username: $scope.username,
        file: $scope.file,
      },
    }).then((resp) => {
      if (resp.data.err) {
        $scope.showError = true
      } else {
        $scope.showError = false
        $scope.article.url = resp.data.location
        $scope.article.mimeType = resp.data.mimeType
        $scope.onVideoDownloaded()
      }
    }, null, (evt) => {
      $scope.file.progress = parseInt(100.0 * evt.loaded / evt.total)
    }).catch(() => {
      $scope.showError = true
    })
  }

  /**
  Utils
  **/
  // Embed videos: youtube, daylimotion, vimeo...
  $scope.cleanVideoUrl = () => {
    if ($scope.article.url.toLowerCase().indexOf("iframe") !== -1
    || $scope.article.url.toLowerCase().indexOf("embed") !== -1) {
      const src = angular.element($scope.article.url)
      $scope.formattedUrl = $sce.trustAsResourceUrl(src.attr("src"))
      $scope.isEmbed = true
    } else {
      $scope.isEmbed = false
      $scope.formattedUrl = null
    }
  }

  // Special case: facebook videos
  $scope.formatFacebookUrl = () => {
    if ($scope.article.url.indexOf("facebook") !== -1) {
      $scope.article.url = "http://www.facebook.com/video/embed?video_id=" + $scope.article.url.split("videos/").pop()
      $scope.isEmbed = true
      $scope.formattedUrl = $sce.trustAsResourceUrl($scope.article.url)
    }
  }

  /**
  Save / Test / Cancel actions
  **/
  $scope.testVideo = () => {
    $scope.cleanVideoUrl()
    $scope.formatFacebookUrl()

    if (!$scope.isEmbed) {
      $scope.onVideoDownloaded()
    }
  }

  $scope.onVideoDownloaded = () => {
    $scope.API.stop()
    $scope.config.sources = [{
      src: $sce.trustAsResourceUrl($scope.article.url),
      type: $scope.article.mimeType,
    }]
  }

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

    if ($scope.isEmbed) {
      $scope.article.isEmbed = true
      $scope.article.url = $scope.formattedUrl
    }

    $scope.article.user = $rootScope.currentUser._id
    ArticleFactory.createArticle($scope.article)
      .then(() => {
        $rootScope.$broadcast("updateArticleList")
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
