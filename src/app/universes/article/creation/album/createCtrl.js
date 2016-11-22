export default function AlbumCreationCtrl($rootScope, $scope, Upload, ArticleFactory, Notification) {
  // Init variables
  $scope.state = null
  $scope.fileUploaded = []
  $scope.article = {
    type: "album",
    photoList: [],
    user: $rootScope.currentUser._id,
  }

  /** ***
  Upload config
  *** ***/
  $scope.upload = (files) => {
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        Upload.upload({
          url: "/upload/photo",
          data: {
            file: files[i],
          },
        }).then((resp) => {
          $scope.state = "success"
          $scope.article.photoList.push({
            filepath: resp.data.location,
            name: resp.data.name,
            id: "",
          })
        }, () => {
          $scope.state = "error"
        }, (evt) => {
          $scope.state = "progress"
          files[i].progress = parseInt(100.0 * evt.loaded / evt.total)
        })
      }
    }
  }

  $scope.dismiss = function() {
    $scope.$dismiss()
  }

  $scope.create = function() {
    if (!$scope.article.title) {
      return Notification.warning({
        title: "Info",
        message: "Mets au moins un titre",
      })
    }

    ArticleFactory.createArticle($scope.article)
      .then(() => {
        $scope.$close(true)
        Notification.success({
          title: "Success",
          message: "Article créé avec succés",
        })
      })
      .catch((err) => {
        Notification.error({
          title: "Error",
          message: err,
        })
      })
  }
}
