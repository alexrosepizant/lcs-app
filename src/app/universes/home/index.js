import Message from "../../factory/model/message"
import ChatFactory from "../../factory/api/chat"
import SocketFactory from "../../factory/api/socket"
import HomeConfig from "./home.config"
import HomeCtrl from "./chat/homeController"

// Create the module where our functionality can attach to
const homeModule = angular.module("app.home", [])
homeModule.config(HomeConfig)
homeModule.factory("Message", Message)
homeModule.factory("ChatFactory", ChatFactory)
homeModule.factory("socket", SocketFactory)
homeModule.controller("HomeCtrl", HomeCtrl)

export default homeModule
