import moment from "moment"

export default function Message(User) {
  return (data) => {
    return angular.extend({
      content: "",
      created: Date.now(),
      room: "",

      getDateFrom() {
        return moment(this.created).fromNow()
      },

      getMention(message) {
        const content = message
        const pattern = /\B\@([\w\-]+)/gim
        let mention = content.match(pattern)

        if (mention) {
          mention = String(mention).split("@")[1]
          if (mention === this.user.username) return mention
        }

        return false
      },
    }, data, {user: new User(data.user)})
  }
}
