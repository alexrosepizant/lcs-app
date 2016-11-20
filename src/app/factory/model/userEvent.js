import moment from "moment"

export default function UserEvent(User) {
  return (data) => {
    return angular.extend({
      title: "",
      content: "",
      created: Date.now(),

      getDateFrom() {
        return moment(this.created).fromNow()
      },
    }, data, {user: new User(data.user)})
  }
}
