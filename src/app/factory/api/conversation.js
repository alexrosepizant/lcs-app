import _ from "lodash"

export default function ConversationFactory($http) {
  return {
    all: [],

    loadConversations() {
      return $http.get("/conversation")
        .then((conversations) => {
          return this.all = conversations.data
        })
    },

    findConversation($scope, conversationId) {
      return $http.get(`/conversation/${conversationId}`)
        .then((conversation) => {
          $scope.conversation = conversation
        })
    },

    getConversation(user1, user2) {

      let usersIds
      let conversation
      let conversations

      if (user1 === "all" || user2 === "all") {
        conversations = _.filter(this.all, (conversation) => {
          return conversation.users.length === 0
        })
        conversation = (conversations.length > 0) ? conversations[0] : {
          users: [],
          messages: [],
        }
      } else {
        conversations = _.filter(this.all, (conversation) => {
          usersIds = _.pluck(conversation.users, "_id")
          return _.contains(usersIds, user1) && _.contains(usersIds, user2)
        })
        conversation = (conversations.length > 0) ? conversations[0] : {
          users: [user1, user2],
          messages: [],
        }
      }

      return conversation
    },

    createConversation($scope, conversation) {
      return $http.post("/conversation", conversation)
    },

    updateConversation($scope, conversation) {
      return $http.put(`/conversation/${conversation._id}`, conversation)
    },

    addOrUpdate($scope, conversation) {
      if (!conversation._id) {
        return this.createConversation($scope, conversation)
      } else {
        return this.updateConversation($scope, conversation)
      }
    },
  }
}
