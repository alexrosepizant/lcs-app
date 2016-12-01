import moment from "moment"

export default function Content(User) {
  return (data) => {
    return angular.extend({
      title: "",
      type: "",

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

      getDateFrom() {
        return moment(this.created).fromNow()
      },
    }, data, {
      user: new User(data.user),
    })
  }
}
