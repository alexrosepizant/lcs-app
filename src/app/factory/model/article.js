import moment from "moment"

export default function Article($sce, $uibModal, $location, UserFactory, User) {
  return (data) => {

    const imgs = angular.element("<div>" + data.content + "</div>").find("img")
    const image = (imgs.length) ? angular.element(imgs[0]).attr("src") : null

    const users = []
    data.comments.forEach((comment) => {
      users.push(new User(comment.user))
    })
    const commentsUser = users.filter((elem, pos, arr) => arr.indexOf(elem) === pos)

    return angular.extend({
      title: "",
      description: "",
      content: "",
      image: image,
      commentsUser: commentsUser,

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

      markAsRead() {
        UserFactory.addReadArticle($scope.article._id)
      },

      toggleCategory(category) {
        if ($scope.article.categories.indexOf(category) === -1) {
          $scope.article.categories.push(category)
        } else {
          $scope.article.categories.splice($scope.article.categories.indexOf(category), 1)
        }
      },

      goToUpdate(evt) {
        if (evt) {
          evt.preventDefault()
          evt.stopPropagation()
        }

        console.warn("redirection vers update article")
      },

      remove(evt) {
        if (evt) {
          evt.preventDefault()
          evt.stopPropagation()
        }

        $uibModal.open({
          templateUrl: "app/universes/article/creation/standard/create.html",
        })
      },
    }, data, {user: new User(data.user)})
  }
}
