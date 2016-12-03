import GenericContent from "../../factory/model/genericContent"
import HomeFactory from "../../factory/api/home"
import CommentFactory from "../../factory/api/comment"
import HomeCtrl from "./dashboard/homeCtrl"
import HomeConfig from "./home.config"

// Create the module where our functionality can attach to
const homeModule = angular.module("app.home", [])
homeModule.config(HomeConfig)
homeModule.factory("GenericContent", GenericContent)
homeModule.factory("HomeFactory", HomeFactory)
homeModule.factory("CommentFactory", CommentFactory)
homeModule.controller("HomeCtrl", HomeCtrl)

export default homeModule
