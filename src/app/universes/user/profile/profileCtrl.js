export default function ProfileCtrl($scope, GlobalFactory, UserFactory, Upload) {

  $scope.user = GlobalFactory.user || {
    avatar: "public/img/users/896b4bf8-a73a-5606-b3e5-1dc3362b472c.JPG",
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
            username: $scope.username,
            file: file,
          },
        }).then(function(resp) {
          $scope.user.avatar = resp.data.path
        })
      }
    }
  }

  $scope.update = function() {
    UserFactory.update($scope.user).then(function(user) {
      $scope.global.user = user
    })
  }
}
