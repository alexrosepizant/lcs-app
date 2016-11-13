import moment from "moment"

export default function Article($sce, UserFactory) {
  return (data) => {
    return angular.extend({
      title: "",
      description: "",

      getDateFrom() {
        return moment(this.created).fromNow()
      },

      getImage(html) {
        const img = angular.element("<div>" + html + "</div>").find("img").first()
        return (img.length) ? img.attr("src") : ""
      },

      getFormattedContent(html) {
        return $sce.trustAsHtml(html)
      },

      trustSrc(src) {
        return $sce.trustAsResourceUrl(src)
      },

      isSpotify(link) {
        return link.indexOf("spotify") !== -1
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
    }, data)
  }
}
