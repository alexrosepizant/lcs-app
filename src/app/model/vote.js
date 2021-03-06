import moment from "moment"

export default function Vote($rootScope, User, Comment) {
  "ngInject"

  const applatir = (arr) => {
    return arr.reduce((a, b) => a.concat(Array.isArray(b) ? applatir(b) : b), [])
  }

  const getAllUsers = (answers = []) => {
    return applatir(answers.map((item) => item.users))
  }

  const hasUserAnswered = (answers) => {
    return getAllUsers(answers).map((user) => user._id).includes($rootScope.currentUser._id)
  }

  return (data) => {
    return angular.extend({
      title: "",
      content: "",
      created: Date.now(),
      endsAt: moment().add(1, "weeks").toString(),
      answers: [],
      hasUserAnswered: hasUserAnswered(data.answers),
      onGoing: moment(data.endsAt).isAfter(new Date()),
      comments: [],

      getAnswerOfCurrentUser() {
        let answerId = null
        for (const answer of this.answers) {
          if (answer.users && answer.users.map((user) => user._id).includes($rootScope.currentUser._id)) {
            answerId = answer._id
          }
        }
        return answerId
      },

      getPercent(answerId) {
        const userCount = this.answers.find((answer) => answer._id === answerId).users.length
        return (userCount > 0) ? Math.round(userCount / getAllUsers(this.answers).length * 100) : 0
      },

      getDays() {
        return moment(this.endsAt).fromNow()
      },
    },
    data,
      {
        answers: (data.answers) ? data.answers.map((answer) => {
          answer.users = answer.users.map((user) => new User(user))
          return answer
        }) : [],
      },
      {
        comments: (data.comments) ? data.comments.map((comment) => new Comment(comment)) : [],
      },
      {
        user: new User(data.user),
      })
  }
}
