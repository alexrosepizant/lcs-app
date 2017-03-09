export default function CreateIssueCtrl($rootScope, $scope, IdeaFactory, Notification, issue) {
  "ngInject"

  // Retrieve params
  $scope.currentUser = $rootScope.currentUser
  $scope.issue = issue
  $scope.categories = [{
    value: "Amélioration",
  },{
    value: "Bug",
  }, {
    value: "Jeux",
  }]

  $scope.addCategory = () => {
    if ($scope.newCategory === "") {
      return
    }

    const categoriesArray = $scope.categories.map((c) => c.value.toLowerCase())
    if (categoriesArray.indexOf($scope.newCategory.toLowerCase()) !== -1) {
      Notification.warning({
        title: "Info",
        message: "La categorie existe déjà.",
      })
    } else {
      $scope.categories.push({
        value: $scope.newCategory,
      })
      $scope.issue.addCategory($scope.newCategory)
      $scope.newCategory = ""
    }
  }

  $scope.dismiss = function() {
    $scope.$dismiss()
  }

  // Save function
  $scope.create = () => {
    if (!$scope.issue.description) {
      return Notification.warning({
        title: "Info",
        message: "Mets au moins une description",
      })
    }

    IdeaFactory.createIdea($scope.issue)
      .then(() => {
        $rootScope.$broadcast("updateIssueList")
        $scope.$close(true)
        Notification.success({
          title: "Success",
          message: "Idée ajoutée avec succés",
        })
      })
      .catch(() => {
        Notification.error({
          title: "Error",
          message: "Erreur lors de l'ajout de l'idée",
        })
      })
  }
}
