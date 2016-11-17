export default function User(AppConstants) {
  return (data) => {
    return angular.extend({
      _id:"",
      avatar: "",
      username: "",
      email: "",

      getAvatar(width, height) {
        const _width = width
        if (!this.avatar || this.avatar === "/img/Professor.png") {
          return AppConstants.defaultImg
        } else {
          const _avatar = this.avatar + "?dim=" + _width
          return (height) ? _avatar + "x" + height : _avatar
        }
      },

      getMention(message) {
        const content = message
        const pattern = /\B\@([\w\-]+)/gim
        let mention = content.match(pattern)

        if (mention) {
          mention = String(mention).split("@")[1]
          if (mention === this.username) return mention
        }

        return false
      },
    }, data)
  }
}
