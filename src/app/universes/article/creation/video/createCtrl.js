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

  $scope.onError = () => {
  }

  $scope.onVideoDownloaded = () => {
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
  Embed videos
  **/
  $scope.currentVideoIsEmbed = () => {
    $scope.article.isEmbed = true
    $scope.formattedUrl = $sce.trustAsResourceUrl($scope.article.url)
  }

  $scope.cleanVideoUrl = () => {
    if ($scope.article.url.toLowerCase().includes("iframe")) {
      const iframeElt = angular.element("<div>" + $scope.article.url + "</div>").find("iframe")
      $scope.article.url = angular.element(iframeElt[0]).attr("src")
    }
  }

  // Special case: facebook videos
  $scope.formatFacebookUrl = () => {
    if ($scope.article.url.toLowerCase().includes("facebook")) {
      $scope.article.url = "http://www.facebook.com/video/embed?video_id=" + $scope.article.url.split("videos/").pop()
    }
  }

  // Special case: facebook videos
  $scope.formatYoutubeUrl = () => {
    if ($scope.article.url.toLowerCase().includes("youtube")) {
      const youtubeReg = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      const id = $scope.article.url.match(youtubeReg)[2]
      $scope.article.url = "https://www.youtube.com/embed/" + id
    }
  }

  /**
  Cancel / Test / Save actions
  **/
  $scope.dismiss = () => {
    $scope.$dismiss()
  }

  $scope.testVideo = () => {
    // TODO: Vidéo uplodaded by user, find best way to detect it
    if ($scope.article.url.includes("tmp/")) {
      $scope.onVideoDownloaded()
    } else {
      $scope.cleanVideoUrl()
      $scope.formatFacebookUrl()
      $scope.formatYoutubeUrl()
      $scope.currentVideoIsEmbed()
    }
    $scope.isTested = true
  }

  $scope.create = () => {
    if (!$scope.article.title) {
      return Notification.warning({
        title: "Info",
        message: "Mets au moins un titre",
      })
    }

    if (!$scope.isTested) {
      return Notification.warning({
        title: "Info",
        message: "Test d'abord, on sait jamais!",
      })
    }

    $scope.article.formattedTitle()
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
