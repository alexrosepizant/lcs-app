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
        return (this.username) ? this.username + ": " : ""
      },

      getMention(username) {
        const content = this.content
        const pattern = /\B\@([\w\-]+)/gim
        let mention = content.match(pattern)

        if (mention) {
          mention = String(mention).split("@")[1]
          username = username.split(" ")[0]
          if (mention === username) return mention
        }
        return false
      },
    }, data)
  }
}
