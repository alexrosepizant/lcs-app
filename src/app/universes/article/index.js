import angular from "angular"

import ArticleFactory from "../../api/article"
import ArticleConfig from "./article.config"
import ArticleListCtrl from "./list/listCtrl"
import VideoCreationCtrl from "./video/createCtrl"

// Create the module where our functionality can attach to
const articleModule = angular.module("app.article", [])
articleModule.config(ArticleConfig)
articleModule.factory("ArticleFactory", ArticleFactory)

articleModule.controller("ArticleListCtrl", ArticleListCtrl)
articleModule.controller("VideoCreationCtrl", VideoCreationCtrl)

export default articleModule
