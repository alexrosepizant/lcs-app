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

      getDay() {
        return moment(this.startsAt).format("dddd")
      },
    },
    data,
      {
        user: new User(data.user),
      },
      {
        guest: (data.guest) ? data.guest.map((user) => new User(user)) : [],
      },
      {
        guestUnavailable: (data.guestUnavailable) ? data.guestUnavailable.map((user) => new User(user)) : [],
      }
    )
  }
}
