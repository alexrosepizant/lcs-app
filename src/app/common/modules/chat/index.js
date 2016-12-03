import Message from "../../../factory/model/message"
import ChatFactory from "../../../factory/api/chat"
import SocketFactory from "../../../factory/api/socket"
import ChatFilter from "./filter"
import ChatCtrl from "./chatCtrl"
import chatDirective from "./lcsChat"

// Create the module where our functionality can attach to
const chatModule = angular.module("app.chat", [])
chatModule.filter("filterConnectedUser", ChatFilter)
chatModule.factory("Message", Message)
chatModule.factory("ChatFactory", ChatFactory)
chatModule.factory("socket", SocketFactory)
chatModule.controller("ChatCtrl", ChatCtrl)
chatModule.directive("lcsChat", chatDirective)

export default chatModule
