import moment from "moment"

export default function Notification($state, User) {
  "ngInject"

  return (data) => {
    return angular.extend({
      created: "",
      title: "",
      type: "",
      contentId: "",

      getFormattedType() {
        switch (this.type) {
        case "comment":
          return " a commenté "
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
        const type = (this.type === "comment") ? this.contentType : this.type
        switch (type) {
        case "standard":
          $state.go("article.standardView", {articleId: this.contentId})
          break
        case "album":
          $state.go("article.albumView", {articleId: this.contentId})
          break
        case "video":
          $state.go("article.videoView", {articleId: this.contentId})
          break
        case "vote":
          $state.go("vote.view", {voteId: this.contentId})
          break
        case "userEvent":
          $state.go("agenda.view", {userEventId: this.contentId})
          break
        default:
          return "article"
        }
      },

      getDateFrom() {
        return moment(this.created).format("Do MMM HH[h]mm")
      },
    }, data, {
      user: new User(data.user),
    })
  }
}
