export default function ProfileCtrl($rootScope, $scope, $translate, $uibModal, $state,
                                    Upload, ArticleFactory, UserFactory, articles, userEvents, user, Notification) {

  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.articles = articles.filter((article) => article.type !== "vote")
  $scope.userEvents = userEvents
  $scope.contents = $scope.articles.concat($scope.userEvents)
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
    Article update and delete
  ***/
  $scope.updateContent = (content) => {
    switch (content.type) {
    case "standard":
      $state.go("article.update", {articleId: content._id})
      break
    case "video":
      $state.go("article.updateVideo", {articleId: content._id})
      break
    case "album":
      $state.go("article.updateAlbum", {articleId: content._id})
      break
    default:
      $state.go("agenda.update", {userEventId: content._id})
      break
    }
  }

  $scope.removeContent = (content) => {
    $uibModal.open({
      templateUrl: "app/features/user/deletion/removeContent.html",
      controller: "RemoveContentCtrl",
      resolve: {
        contentId: () => {
          return content._id
        },
        type: () => {
          return content.type || "agenda"
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
          title: "Erreur",
          message: "L'ancien mot de passe n'est pas valide.",
        })
      })
  }
}
