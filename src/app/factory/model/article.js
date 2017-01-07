import moment from "moment"

const getPreview = (content) => {
  const imgs = angular.element("<div>" + content + "</div>").find("img")
  return (imgs.length) ? angular.element(imgs[0]).attr("src") : null
}

export default function Article($sce, User, Comment) {
  "ngInject"

  return (data) => {

    return angular.extend({
      title: "",
      description: "",
      content: "",
      content: "",
      image: getPreview(data.content),
      categories: [],
      commentsUser: (data.comments) ? data.comments.map((comment) => new User(comment.user)) : [],
      sources: [{
        src: $sce.trustAsResourceUrl(data.url),
        type: data.mimeType,
      }],

      getTitle() {
        return this.title
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

      getSuggestionAnswerLength(vote, option) {
        const totalVoteCount = vote.yes.concat(this.no, this.blank).length
        return (totalVoteCount === 0) ? 0 : Math.round(vote[option].length / totalVoteCount * 100)
      },

      hasCategory(category) {
        return this.categories.indexOf(category) !== -1
      },

      addCategory(category) {
        if (this.hasCategory()) {
          return false
        }
        return this.categories.push(category)
      },

      toggleCategory(category) {
        if (this.addCategory(category)) {
          return
        }
        this.categories.splice(this.categories.indexOf(category), 1)
      },
    }, data, {
      user: new User(data.user),
    }, {
      comments: (data.comments) ? data.comments.map((comment) => new Comment(comment)) : [],
    })
  }
}
