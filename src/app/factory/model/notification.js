import moment from "moment"

export default function Notification($state, User) {
  return (data) => {
    return angular.extend({
      created: "",
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

      openLink() {
        switch (this.type) {
        case "standard":
          $state.go("standardView", {articleId: this.contentId})
          break
        case "album":
          $state.go("albumView", {articleId: this.contentId})
          break
        case "video":
          $state.go("videoView", {articleId: this.contentId})
          break
        case "vote":
          $state.go("videoView", {articleId: this.contentId})
          break
        case "userEvent":
          $state.go("agenda", {eventId: this.contentId})
          break
        default:
          return "article"
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
