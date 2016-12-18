export default function ArticleListCtrl($scope, $state, ArticleFactory,
  articles, users, filter, currentCategory, parameters, count, page) {

    /**
    Retrieve params
    **/
  $scope.articles = articles
  $scope.users = users
  $scope.filter = filter
  $scope.currentCategory = currentCategory
  $scope.categories = (parameters) ? parameters.articleCategories : []

  /**
  Other blogs
  **/
  $scope.blogs = [{
    title: "Deux noix au pays des kiwis",
    image: "http://3.bp.blogspot.com/-orcYUEeVfM0/Ub-k8bmG82I/AAAAAAAAEaE/wWcST2FFK5I/s320/IMGP6398.JPG",
    href: "http://deux-noix-nz.blogspot.fr/",
  },{
    title: "Objectif Japon tkt!",
    image: "https://objectifjapon.files.wordpress.com/2013/07/p7024411.jpg?w=1020&h=764",
    href: "https://objectifjapon.wordpress.com/",
  },{
    title: "Onnefepanapotekwa",
    image: "http://68.media.tumblr.com/0f8e568a5c2d4e566e2d155389d9b509/tumblr_o4ht86c6GL1t7rsbxo9_500.jpg",
    href: "http://onnefepanapotekwa.tumblr.com/",
  },{
    title: "Bande de mickeys en 4L",
    image: "http://placehold.it/128x128",
    href: "Adresse expirée?!",
  }]

    /**
    Pagination
    **/
  $scope.maxSize = 5
  $scope.totalItems = count
  $scope.currentPage = page
  $scope.itemPerPage = 20

  $scope.pageChanged = () => {
    ArticleFactory.findArticles($scope.filter, $scope.currentPage - 1)
      .then((articles) => {
        $scope.articles = articles
      })
  }

    /**
    Event listener on list update for article creation
    **/
  $scope.$on("updateArticleList", () => {
    ArticleFactory.findArticles(filter)
      .then((articles) => $scope.articles = articles)
  })
}
