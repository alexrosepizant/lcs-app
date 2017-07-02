import moment from "moment"

export default function Article($sce, User, Comment) {
  "ngInject"

  return (data) => {

    return angular.extend({
      title: "",
      description: "",
      content: "",
      content: "",
      hasPreview: (angular.element("<div>" + data.content + "</div>").find("img").length > 0),
      categories: [],
      commentsUser: (data.comments) ? data.comments.map((comment) => new User(comment.user)) : [],
      sources: [{
        src: $sce.trustAsResourceUrl(data.url),
        type: "video/mp4",
      }],
      isYoutubeLink: data.url && data.url.includes("youtube"),

      getTitle() {
        return this.title
      },

      getPreview() {
        const imgs = angular.element("<div>" + this.content + "</div>").find("img")
        return (imgs.length > 0) ? angular.element(imgs[0]).attr("src") : null
      },

      formattedTitle() {
        this.title = angular.element("<div>" + this.title + "</div>").text()
      },

      getType() {
        return (this.type === "standard") ? "Article" : this.type
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

      getYoutubeLink() {
        return this.url.split("embed/")[1]
      },

      getSuggestionAnswerLength(vote, option) {
        const totalVoteCount = vote.yes.concat(this.no, this.blank).length
        return (totalVoteCount === 0) ? 0 : Math.round(vote[option].length / totalVoteCount * 100)
      },

      hasCategory(category) {
        return this.categories.includes(category)
      },

      toggleCategory(category) {
        if (this.categories.includes(category)) {
          this.categories.splice(this.categories.indexOf(category), 1)
        } else {
          this.categories.push(category)
        }
      },
    }, data, {
      user: new User(data.user),
    }, {
      comments: (data.comments) ? data.comments.map((comment) => new Comment(comment)) : [],
    })
  }
}
