import Message from "../../factory/model/message"
import ChatFactory from "../../factory/api/chat"
import SocketFactory from "../../factory/api/socket"
import ngEnterDirective from "./chat/directive"
import ChatFilter from "./chat/filter"
import ChatCtrl from "./chat/chatCtrl"
import HomeConfig from "./home.config"

// Create the module where our functionality can attach to
const homeModule = angular.module("app.home", [])
homeModule.config(HomeConfig)
homeModule.directive("ngEnter", ngEnterDirective)
homeModule.filter("filterConnectedUser", ChatFilter)
homeModule.factory("Message", Message)
homeModule.factory("ChatFactory", ChatFactory)
homeModule.factory("socket", SocketFactory)
homeModule.controller("ChatCtrl", ChatCtrl)

export default homeModule
