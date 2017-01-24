export default function AboutListCtrl($scope, IdeaFactory, ideas) {
  "ngInject"

  // Retrieve params
  $scope.ideas = ideas

  $scope.addLike = (idx) => {
    $scope.ideas[idx].like += 1
    IdeaFactory.updateIdea($scope.ideas[idx])
  }

  $scope.$on("updateIssueList", () => {
    IdeaFactory.loadIdeas()
      .then((ideas) => $scope.ideas = ideas)
  })
}
