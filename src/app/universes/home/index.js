import NotificationModel from "../../factory/model/notification"
import NotificationFactory from "../../factory/api/notification"
import HomeCtrl from "./dashboard/homeCtrl"
import HomeConfig from "./home.config"

// Create the module where our functionality can attach to
const homeModule = angular.module("app.home", [])
homeModule.config(HomeConfig)
homeModule.factory("NotificationModel", NotificationModel)
homeModule.factory("NotificationFactory", NotificationFactory)
homeModule.controller("HomeCtrl", HomeCtrl)

export default homeModule
