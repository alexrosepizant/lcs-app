export default function AlbumCreationCtrl($scope, Upload, ArticleFactory) {
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
          console.warn(resp.data.location)
        }, (err) => {
          console.warn("err" + err)
        }, () => {
          // const progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
        })
      }
    }
  }

  $scope.dismiss = function() {
    $scope.$dismiss()
  }

  $scope.create = function() {
    ArticleFactory.create($scope.article)
  }
}
