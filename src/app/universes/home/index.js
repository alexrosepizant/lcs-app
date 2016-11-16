import ConversationFactory from "../../factory/api/conversation"
import HomeConfig from "./home.config"
import HomeCtrl from "./homeController"

// Create the module where our functionality can attach to
const homeModule = angular.module("app.home", [])
homeModule.config(HomeConfig)
homeModule.factory("ConversationFactory", ConversationFactory)
homeModule.controller("HomeCtrl", HomeCtrl)

export default homeModule
