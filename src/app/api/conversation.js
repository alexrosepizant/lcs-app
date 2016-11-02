export default function ConversationFactory($http) {

  function getConversations($scope) {
    $http.get("/conversation").success((conversation) => {
      $scope.conversation = conversation
    })
  }

  function getConversation($scope, conversationId) {
    $http.get(`/conversation/${conversationId}`).success((conversation) => {
      $scope.conversation = conversation
    })
  }

  function createConversation($scope, conversation) {
    $http.post("/conversation", conversation).success((conversation) => {
      $scope.conversation = conversation
    })
  }

  function updateConversation($scope, conversation) {
    $http.put(`/conversation/${conversation._id}`, conversation).success(() => {
      console.warn("Conversation updated")
    })
  }

  return {
    getConversations,
    getConversation,
    createConversation,
    updateConversation,
    getConversationCount,
  }
}
