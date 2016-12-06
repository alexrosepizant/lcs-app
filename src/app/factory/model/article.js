import moment from "moment"

export default function Article($sce, $uibModal, $location, UserFactory, User, Comment) {
  return (data) => {

    const imgs = angular.element("<div>" + data.content + "</div>").find("img")
    const image = (imgs.length) ? angular.element(imgs[0]).attr("src") : null

    const users = []
    if (data.comments) {
      data.comments.forEach((comment) => users.push(new User(comment.user)))
    }
    const commentsUser = users.filter((elem, pos, arr) => arr.indexOf(elem) === pos)

    return angular.extend({
      title: "",
      description: "",
      content: "",
      image: image,
      categories: [],
      commentsUser: commentsUser,
      sources: [{
        src: $sce.trustAsResourceUrl(data.url),
        type: data.mimeType,
      }],

      getTitle() {
        return angular.element("<div>" + this.title + "</div>").text()
      },

      getContent() {
        return angular.element("<div>" + this.content + "</div>").html()
      },

      getFormattedContent() {
        return angular.element("<div>" + this.content + "</div>").text()
      },

      getDateFrom() {
        return moment(this.created).fromNow()
      },

      getVideoLink() {
        return $sce.trustAsResourceUrl(this.url)
      },

      getSuggestionAnswerLength(suggestion, option) {
        if (suggestion.yes.length + suggestion.no.length + suggestion.blank.length === 0) {
          return 0
        } else {
          return Math.round(suggestion[option].length /
            (suggestion.yes.length + suggestion.no.length + suggestion.blank.length) * 100)
        }
      },

      hasCategory(category) {
        return this.categories && this.categories.indexOf(category) !== -1
      },

      toggleCategory(category) {
        if (this.categories.indexOf(category) === -1) {
          this.categories.push(category)
        } else {
          this.categories.splice(this.categories.indexOf(category), 1)
        }
      },
    }, data, {
      user: new User(data.user),
    }, {
      comments: (data.comments) ? data.comments.map((comment) => new Comment(comment)) : [],
    })
  }
}
