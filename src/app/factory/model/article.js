import moment from "moment"

export default function Article($sce, UserFactory, User) {
  return (data) => {
    return angular.extend({
      title: "",
      description: "",

      getTitle() {
        return angular.element("<div>" + this.title + "</div>").html()
      },

      getContent() {
        return angular.element("<div>" + this.content + "</div>").html()
      },

      getImage() {
        const img = angular.element("<div>" + this.content + "</div>").find("img").first()
        return (img.length) ? img.attr("src") : ""
      },

      getDateFrom() {
        return moment(this.created).fromNow()
      },

      trustSrc() {
        return $sce.trustAsResourceUrl(this.src)
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
    }, data, {user: new User(data.user)})
  }
}
