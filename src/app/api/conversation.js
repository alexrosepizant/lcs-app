export default function ConversationFactory($http) {
  return {
    loadConversations($scope) {
      $http.get("/conversation").then((conversation) => {
        $scope.conversation = conversation
      })
    },

    findConversation($scope, conversationId) {
      $http.get(`/conversation/${conversationId}`).then((conversation) => {
        $scope.conversation = conversation
      })
    },

    createConversation($scope, conversation) {
      $http.post("/conversation", conversation).then((conversation) => {
        $scope.conversation = conversation
      })
    },

    updateConversation($scope, conversation) {
      $http.put(`/conversation/${conversation._id}`, conversation).then(() => {
        console.warn("Conversation updated")
      })
    },
  }
}
