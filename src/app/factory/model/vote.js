import moment from "moment"

export default function Vote(User) {
  "ngInject"

  return (data) => {
    return angular.extend({
      content: "",
      created: Date.now(),
      endsAt: "",
      blank: [],
      yes: [],
      no: [],

      hasUserAnswered(userId) {
        return this.yes.concat(this.no, this.blank).indexOf(userId) !== -1
      },

      getDays() {
        return moment(this.endsAt).fromNow()
      },
    }, data, {user: new User(data.user)})
  }
}
