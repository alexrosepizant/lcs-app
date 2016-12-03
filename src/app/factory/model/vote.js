import moment from "moment"

export default function Vote(User) {
  return (data) => {
    return angular.extend({
      content: "",
      created: Date.now(),
      blank: [],
      yes: [],
      no: [],

      hasUserAnswered(userId) {
        return this.yes.concat(this.no, this.blank).indexOf(userId) !== -1
      },

      getDays() {
        return moment(this.created).add(1, "months").fromNow()
      },
    }, data, {user: new User(data.user)})
  }
}
