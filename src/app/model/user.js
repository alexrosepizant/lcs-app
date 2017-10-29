import moment from "moment"

export default function User(AppConstants) {
  "ngInject"

  return (data) => {
    return angular.extend({
      _id:"",
      avatar: "",
      username: "",
      presentation: "",
      lastConnectionDate: "",

      getAvatar(width, height) {
        const _width = width || 80
        if (!this.avatar || this.avatar === "/img/Professor.png") {
          return AppConstants.defaultImg
        } else {
          const _avatar = this.avatar + "?dim=" + _width
          return (height) ? _avatar + "x" + height : _avatar
        }
      },

      getLastConnexion() {
        return moment(this.lastConnectionDate).fromNow()
      },
    }, data)
  }
}
