export default function AlbumCreationCtrl($rootScope, $scope, Upload, ArticleFactory, Notification, article) {
  "ngInject"

  // Retrieve params
  $scope.article = article

  // Init variables
  $scope.fileUploaded = []

  /** ***
  Upload config
  *** ***/
  $scope.upload = (files) => {
    const existingLength = $scope.fileUploaded.length
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        $scope.fileUploaded[existingLength + i] = files[i]
        Upload.upload({
          url: "/upload/photo",
          data: {
            file: $scope.fileUploaded[existingLength + i],
          },
        }).then((resp) => {
          $scope.fileUploaded[existingLength + i].state = "success"
          $scope.article.photoList.push({
            filepath: resp.data.location,
            name: resp.data.name,
            id: "",
          })
        }, () => {
          $scope.fileUploaded[existingLength + i].state = "error"
        }, (evt) => {
          $scope.fileUploaded[existingLength + i].state = "progress"
          $scope.fileUploaded[existingLength + i].progress = parseInt(100.0 * evt.loaded / evt.total)
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
      .catch((err) => {
        Notification.error({
          title: "Error",
          message: err,
        })
      })
  }
}