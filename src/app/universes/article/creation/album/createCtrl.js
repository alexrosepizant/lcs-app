export default function AlbumCreationCtrl($rootScope, $scope,
  Upload, ArticleFactory, Notification, article, parameters) {

  // Retrieve params
  $scope.article = article
  $scope.categories = (parameters) ? parameters.articleCategories : []

  // Init variables
  $scope.fileUploaded = []

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
          files[i].state = "success"
          $scope.article.photoList.push({
            filepath: resp.data.location,
            name: resp.data.name,
            id: "",
          })
        }, () => {
          files[i].state = "error"
        }, (evt) => {
          files[i].state = "progress"
          files[i].progress = parseInt(100.0 * evt.loaded / evt.total)
        })
      }
    }
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
      .catch((err) => {
        Notification.error({
          title: "Error",
          message: err,
        })
      })
  }
}
