export default function AboutListCtrl($scope, IssueFactory, issues) {
  "ngInject"

  // Retrieve params
  $scope.issues = issues

  $scope.$on("updateIssueList", () => {
    IssueFactory.loadIssues()
      .then((issues) => $scope.issues = issues)
  })
}
