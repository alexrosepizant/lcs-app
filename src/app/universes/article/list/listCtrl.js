export default function ArticleListCtrl($scope, ArticleFactory) {

  // Load data
  ArticleFactory.loadArticles($scope)
}
