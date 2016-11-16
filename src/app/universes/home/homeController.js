export default function HomeCtrl($scope, AuthFactory, ConversationFactory, UserFactory) {

  $scope.conversations = {}
  $scope.conversation = null
  $scope.message = {
    content: "",
  }

  // get current user
  $scope.currentUser = AuthFactory.getCurrentUser()

  // load conversations
  $scope.initializeConversations = () => {

    UserFactory.getUsers()
      .then((users) => {
        return $scope.team = users
      }).then(() => {
        return ConversationFactory.loadConversations()
      }).then(() => {

        // Add global conversation
        $scope.conversations["all"] = {
          conversation: ConversationFactory.getConversation("all"),
          username: "Tout le monde",
          avatar: "img/coq.png",
          userId: "all",
          unReadMessageCount: 0,
        }

        _.each($scope.team, function(user) {
          if ($scope.currentUser._id !== user._id) {
            $scope.conversations[user._id] = {
              conversation: ConversationFactory.getConversation($scope.currentUser._id, user._id),
              username: user.username,
              avatar: user.avatar,
              userId: user._id,
              exclude: user.exclude,
            }
          }
        })

        $scope.selectUser(null, "all")
      })
  }

  $scope.selectUser = (evt, userId) => {
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }

    $scope.conversation = $scope.conversations[userId].conversation
    $scope.conversations[userId].unReadMessageCount = 0
    ConversationFactory.updateConversation($scope, $scope.conversation)
  }

  $scope.sendMessage = () => {
    if ($scope.message.content !== "") {

      $scope.conversation.messages.push({
        user: $scope.currentUser._id,
        content: $scope.message.content,
      })

      ConversationFactory.addOrUpdate($scope, $scope.conversation)
        .then((conversation) => $scope.conversation._id = conversation._id)
    }
  }

  if (!$scope.currentUser) {
    AuthFactory.updateCurrentUser()
      .then(() => {
        $scope.currentUser = AuthFactory.getCurrentUser()
        $scope.initializeConversations()
      })
  } else {
    $scope.initializeConversations()
  }
}
