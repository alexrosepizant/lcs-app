import moment from "moment"

export default function Vote(User) {
  return (data) => {
    return angular.extend({
      content: "",
      created: Date.now(),

      getDays() {
        return moment(this.created).add(1, "months").fromNow()
      },
    }, data, {user: new User(data.user)})
  }
}
