export default function AboutListCtrl($scope, IdeaFactory, ideas) {
  "ngInject"

  // Retrieve params
  $scope.ideas = ideas
  $scope.options = [{
    id: 0,
    name: "A faire",
    type: "todo",
  }, {
    id: 1,
    name: "En cours",
    type: "ongoing",
  }, {
    id: 3,
    name: "Fait",
    type: "done",
  }]

  $scope.addLike = (idx) => {
    $scope.ideas[$scope.ideas.length - idx - 1].like += 1
    IdeaFactory.updateIdea($scope.ideas[idx])
  }

  $scope.updateIdea = (idea) => {
    IdeaFactory.updateIdea(idea)
  }

  $scope.$on("updateIssueList", () => {
    IdeaFactory.loadIdeas()
      .then((ideas) => $scope.ideas = ideas)
  })
}
