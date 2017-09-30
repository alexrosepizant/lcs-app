"use strict"

describe("Article module", () => {
  let articleListCtrl
  let scope

  beforeEach(angular.mock.module("ui.router"))
  beforeEach(angular.mock.module("app.article"))
  beforeEach(inject(function($controller, _$rootScope_) {

    // spec body
    const $rootScope = _$rootScope_
    scope = $rootScope.$new()

    articleListCtrl = $controller("ArticleListCtrl", {
      $rootScope: $rootScope,
      $scope: scope,
      ArticleFactory: {},
      articles: {},
      users: {},
      filter: {},
      count: {},
      page: {},
    })
  }))

  describe("ArticleListCtrl", function() {
    it("should be instanciated", () => {
      expect(articleListCtrl).toBeDefined()
    })

    it("should set max page", () => {
      expect(scope.maxSize).toBe(5)
    })
  })
})