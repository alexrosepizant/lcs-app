export default function AboutListCtrl($scope, IdeaFactory, ideas) {
  "ngInject"

  // Retrieve params
  $scope.ideas = ideas

  $scope.addLike = (idx) => {
    $scope.ideas[$scope.ideas.length - idx - 1].like += 1
    IdeaFactory.updateIdea($scope.ideas[idx])
  }

  $scope.$on("updateIssueList", () => {
    IdeaFactory.loadIdeas()
      .then((ideas) => $scope.ideas = ideas)
  })
}
