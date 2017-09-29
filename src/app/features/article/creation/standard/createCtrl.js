export default function StandardCreationCtrl($rootScope, $scope, ArticleFactory, Notification, Upload, article) {
  "ngInject"

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
          if (!resp.data.mimeType) {
            $scope.article.content += "<img src='" + resp.data.location + "'/>"
          } else {
            $scope.article.content += "<a class='external' href='/public/img/users/"
              + resp.data.location.split("/").pop()
              + "' target=\"_blank\"><i class=\"fa fa-file\">&nbsp;" + resp.data.location.split("/").pop()
              + "</i></a>"
          }
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
