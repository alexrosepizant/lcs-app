export default function IdeaListCtrl($scope, IdeaFactory, ideas) {

  // Retrieve params
  $scope.ideas = ideas

  $scope.$on("updateIdeaList", () => {
    IdeaFactory.loadIdeas()
      .then((ideas) => $scope.ideas = ideas)
  })
}
