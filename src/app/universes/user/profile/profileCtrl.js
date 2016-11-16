export default function ProfileCtrl($scope, UserFactory, AuthFactory, ArticleFactory, Upload, $translate) {

  // get current user
  $scope.user = AuthFactory.getCurrentUser()

  // load user contents
  ArticleFactory.getArticlesByUser($scope)

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

  /** *
    SKILLS
  ***/
  $scope.initSkill = function() {
    $scope.skill = {
      name: "",
      value: "",
    }
  }

  $scope.addSkill = function() {

    if (!$scope.user.skills) {
      $scope.user.skills = []
    }

    const currentSkill = angular.extend({}, $scope.skill)
    $scope.user.skills.push(currentSkill)
    $scope.initSkill()
  }

  $scope.removeSkill = function(skill) {
    $scope.user.skills.splice($scope.user.skills.indexOf(skill), 1)
  }

  /** *
    SETTINGS
  ***/
  $scope.changeLanguage = function(key) {
    $translate.use(key)
  }

  $scope.update = function() {
    UserFactory.update($scope.user).then(function(user) {
      $scope.global.user = user
    })
  }
}
