export default function IdeaListCtrl($scope, IdeaFactory) {

  // Load data
  IdeaFactory.loadIdeas($scope)
}
