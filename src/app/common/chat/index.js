import Message from "../../model/message"
import ChatFactory from "../../service/chat"
import SocketFactory from "../../service/socket"
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
