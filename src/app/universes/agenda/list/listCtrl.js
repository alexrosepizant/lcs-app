export default function AgendaListCtrl($scope, AgendaFactory) {

  // Load data
  AgendaFactory.loadUserEvents($scope)
}
