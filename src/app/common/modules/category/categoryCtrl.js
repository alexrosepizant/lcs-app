export default function CategoryCtrl($rootScope, $scope, ParameterFactory, Notification) {

  // on load
  ParameterFactory.getParameters()
    .then((parameters) => {
      $scope.parameters = parameters
      $scope.categories = parameters.articleCategories
    })

  $scope.addCategory = () => {
    if ($scope.newCategory === "") {
      return
    }

    const categoriesArray = $scope.parameters.articleCategories.map((c) => c.value.toLowerCase())
    if (categoriesArray.indexOf($scope.newCategory.toLowerCase()) !== -1) {
      Notification.warning({
        title: "Info",
        message: "La categorie existe déjà.",
      })
    } else {
      $scope.parameters.articleCategories.push({
        value: $scope.newCategory,
      })
      ParameterFactory.updateParameters($scope.parameters).then(() => {
        $scope.article.addCategory($scope.newCategory)
        $scope.newCategory = ""
      })
    }
  }
}
