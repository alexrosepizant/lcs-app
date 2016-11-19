import moment from "moment"

export default function Message() {
  return (data) => {
    return angular.extend({
      content: "",
      created: Date.now(),
      username: "",
      room: "",

      getDateFrom() {
        return moment(this.created).fromNow()
      },

      getUsername() {
        if (this.username) {
          return this.username + ": "
        } else {
          return ""
        }
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
    }, data)
  }
}
