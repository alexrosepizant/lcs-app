export default function StandardCreationCtrl($scope, $location, ArticleFactory, Upload, Notification) {

  $scope.showError = false
  $scope.article = {
    type: "standard",
  }

  /** ***
  Upload config
  *** ***/
  $scope.$watch("file", function() {
    if ($scope.file !== null) {
      $scope.files = [$scope.file]
    }
  })

  $scope.upload = function(files) {
    if (files && files.length) {
      const file = files[0]
      if (!file.$error) {
        Upload.upload({
          url: "/upload/photo",
          data: {
            file: file,
          },
        }).then(function(resp) {
          $scope.article.content += "<img src='" + resp.data.path + "'/>"
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
