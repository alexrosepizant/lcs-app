export default function ArticleListCtrl($rootScope, $scope, ArticleFactory,
    articles, users, filter, count, page, AppConstants) {
  "ngInject"

    /**
    Retrieve params
    **/
  $scope.articles = articles
  $scope.users = users
  $scope.filter = filter
    /**
    Pagination
    **/
  $scope.maxSize = 5
  $scope.totalItems = count
  $scope.currentPage = (page + 1)
  $scope.itemPerPage = AppConstants.aticlePerPage

  $scope.pageChanged = (currentPage) => {
    ArticleFactory.findArticles($scope.filter, currentPage - 1)
      .then((articles) => {
        $scope.articles = articles
        return ArticleFactory.getArticleCount($scope.filter)
      }).then((count) => {
        $scope.totalItems = count
      })
  }

    /**
    Event listener on list update for article creation
    **/
  $scope.$on("updateArticleList", () => {
    ArticleFactory.findArticles($scope.filter, 0)
        .then((articles) => {
          $scope.articles = articles
          return ArticleFactory.getArticleCount($scope.filter)
        }).then((count) => {
          $scope.totalItems = count
        })
  })

  $scope.labnolThumb = (id) => {
    const thumb = "<img src=\"https://i.ytimg.com/vi/ID/hqdefault.jpg\">"
    const play = "<div class=\"play\"></div>"
    return thumb.replace("ID", id) + play
  }

  $scope.labnolIframe = function() {
    const iframe = document.createElement("iframe")
    const embed = "https://www.youtube.com/embed/ID?autoplay=1"
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id))
    iframe.setAttribute("frameborder", "0")
    iframe.setAttribute("allowfullscreen", "1")
    this.parentNode.replaceChild(iframe, this)
  }

  angular.element(document).ready(() => {
    let div
    let n
    const v = document.getElementsByClassName("youtube-player")
    for (n = 0; n < v.length; n++) {
      div = document.createElement("div")
      div.setAttribute("data-id", v[n].dataset.id)
      div.innerHTML = $scope.labnolThumb(v[n].dataset.id)
      div.onclick = $scope.labnolIframe
      v[n].appendChild(div)
    }
  })
}
