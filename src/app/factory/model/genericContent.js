import moment from "moment"

export default function Content(User) {
  return (data) => {
    return angular.extend({
      title: "",
      type: "",
      contentId: "",

      getFormattedType() {
        switch (this.type) {
        case "comment":
          return " a laissé "
        default:
          return " a ajouté "
        }
      },

      getIcon() {
        switch (this.type) {
        case "standard":
          return "fa-file-text-o"
        case "album":
          return "fa-image"
        case "video":
          return "fa-play-circle"
        case "vote":
          return "fa-hand-stop-o"
        case "userEvent":
          return "fa-calendar-o"
        case "comment":
          return "fa-comment"
        default:
          return "fa-comment"
        }
      },

      getLink() {
        switch (this.type) {
        case "standard":
          return "standardView({articleId:'" + this._id + "'})"
        case "album":
          return "albumView({articleId:'" + this._id + "'})"
        case "video":
          return "videoView({articleId:'" + this._id + "'})"
        case "vote":
          return "vote"
        case "userEvent":
          return "agenda"
        case "comment":
          return "fa-comment"
        default:
          return "fa-comment"
        }
      },

      getDateFrom() {
        return moment(this.created).fromNow()
      },
    }, data, {
      user: new User(data.user),
    })
  }
}
