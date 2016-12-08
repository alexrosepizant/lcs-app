export default function StandardCreationCtrl($rootScope, $scope, ArticleFactory, Notification, Upload, article) {

  // Retrieve params
  $scope.article = article

  /** ***
  Upload config
  *** ***/
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
          url: "/upload/photo",
          data: {
            file: file,
          },
        }).then((resp) => {
          $scope.article.content += "<img src='" + resp.data.location + "'/>"
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
