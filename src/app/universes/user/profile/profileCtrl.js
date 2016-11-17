export default function ProfileCtrl($rootScope, $scope, $translate, Upload, UserFactory, ArticleFactory) {

  // get current user
  $scope.user = $rootScope.currentUser

  // load user contents
  ArticleFactory.getArticlesByUser($scope)

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
            username: $scope.username,
            file: file,
          },
        }).then((resp) => {
          $scope.user.avatar = resp.data.path
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

    if (!$scope.user.skills) {
      $scope.user.skills = []
    }

    const currentSkill = angular.extend({}, $scope.skill)
    $scope.user.skills.push(currentSkill)
    $scope.initSkill()
  }

  $scope.removeSkill = (skill) => {
    $scope.user.skills.splice($scope.user.skills.indexOf(skill), 1)
  }

  /** *
    SETTINGS
  ***/
  $scope.changeLanguage = (key) => {
    $translate.use(key)
  }

  $scope.update = () => {
    UserFactory.update($scope.user).then((user) => {
      $scope.user = user
    })
  }
}
