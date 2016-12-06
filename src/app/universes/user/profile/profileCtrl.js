export default function ProfileCtrl($rootScope, $scope, $translate, $uibModal,
                                    Upload, ArticleFactory, UserFactory, articles, user, Notification) {

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.articles = articles
  $scope.filter = "all"
  $scope.user = user

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
            currentUsername: $scope.currentUsername,
            file: file,
          },
        }).then((resp) => {
          $scope.user.avatar = resp.data.location
        })
      }
    }
  }

  /** *
    Article deletion
  ***/
  $scope.remove = (evt, articleId) => {
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }

    $uibModal.open({
      templateUrl: "app/universes/user/deletion/removeArticle.html",
      controller: "RemoveContentCtrl",
      resolve: {
        articleId: () => {
          return articleId
        },
        type: () => {
          return "article"
        },
      },
    })
  }

  $scope.$on("updateUserContentList", () => {
    ArticleFactory.getArticlesByUser($rootScope.currentUser._id)
      .then((articles) => $scope.articles = articles)
  })

  /** *
    SETTINGS
  ***/
  $scope.changeLanguage = (key) => {
    $translate.use(key)
  }

  /** *
    Update
  ***/
  $scope.update = () => {
    UserFactory.updateUser($scope.user)
      .then(() => {
        Notification.success({
          title: "Success",
          message: "Profil bien mis a jour.",
        })
      })
      .catch(() => {
        Notification.error({
          title: "Error",
          message: "Erreur dans la mise à jour du profil",
        })
      })
  }
}
