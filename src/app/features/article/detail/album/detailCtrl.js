export default function AlbumDetailCtrl($window, $rootScope, $scope, $http, $state, $uibModal, article) {
  "ngInject"

  // Init variables
  $scope.currentUser = $rootScope.currentUser
  $scope.article = article

  /** *
    Article update and delete
  ***/
  $scope.updateContent = () => {
    $state.go("article.updateAlbum", {articleId: $scope.article._id})
  }

  $scope.removeContent = () => {
    $uibModal.open({
      templateUrl: "app/features/user/deletion/removeContent.html",
      controller: "RemoveContentCtrl",
      resolve: {
        contentId: () => {
          return $scope.article._id
        },
        type: () => {
          return "album"
        },
      },
    })
  }

  $scope.download = function(evt) {
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }

    $http.post("/download/" + $scope.article._id)
      .then(({data}) => {
        if (data.success) {
          $window.open("/file/" + $scope.article._id, "_blank")
        }
      }).catch((error) => {
        console.warn(error)
      })
  }
}
