export default function ProfileCtrl($rootScope, $scope, $translate, Upload, UserFactory, articles) {

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.articles = articles
  $scope.filter = "all"

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
          $scope.currentUser.avatar = resp.data.path
        })
      }
    }
  }

  /** *
    SKILLS
  ***/
  $scope.initSkill = () => {
    $scope.skill = {
      name: "",
      value: "",
    }
  }

  $scope.addSkill = () => {

    if (!$scope.currentUser.skills) {
      $scope.currentUser.skills = []
    }

    const currentSkill = angular.extend({}, $scope.skill)
    $scope.currentUser.skills.push(currentSkill)
    $scope.initSkill()
  }

  $scope.removeSkill = (skill) => {
    $scope.currentUser.skills.splice($scope.currentUser.skills.indexOf(skill), 1)
  }

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
    UserFactory.update($scope.currentUser).then((user) => {
      $scope.currentUser = user
    })
  }
}
