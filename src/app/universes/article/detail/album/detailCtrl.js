export default function AlbumDetailCtrl($window, $rootScope, $scope, $http, article) {
  // Init variables
  $scope.currentUser = $rootScope.currentUser
  $scope.article = article

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
