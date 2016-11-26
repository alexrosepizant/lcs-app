import Article from "../../factory/model/article"
import ArticleFactory from "../../factory/api/article"
import ParameterFactory from "../../factory/api/parameter"
import lcsBlogPostDirective from "./lcsBlogPost"
import ArticleConfig from "./article.config"
import ArticleListCtrl from "./list/listCtrl"
import VideoCreationCtrl from "./creation/video/createCtrl"
import StandardCreationCtrl from "./creation/standard/createCtrl"
import AlbumCreationCtrl from "./creation/album/createCtrl"

// Create the module where our functionality can attach to
const articleModule = angular.module("app.article", [])
articleModule.config(ArticleConfig)
articleModule.factory("Article", Article)
articleModule.factory("ArticleFactory", ArticleFactory)
articleModule.factory("ParameterFactory", ParameterFactory)
articleModule.directive("lcsBlogPost", lcsBlogPostDirective)

articleModule.controller("ArticleListCtrl", ArticleListCtrl)
articleModule.controller("VideoCreationCtrl", VideoCreationCtrl)
articleModule.controller("StandardCreationCtrl", StandardCreationCtrl)
articleModule.controller("AlbumCreationCtrl", AlbumCreationCtrl)

export default articleModule
