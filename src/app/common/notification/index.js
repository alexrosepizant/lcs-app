import NotificationModel from "../../model/notification"
import NotificationFactory from "../../service/notification"
import NotificationCtrl from "./notificationCtrl"
import notificationDirective from "./lcsNotification"

// Create the module where our functionality can attach to
const notificationModule = angular.module("app.notification", [])
notificationModule.factory("NotificationModel", NotificationModel)
notificationModule.factory("NotificationFactory", NotificationFactory)
notificationModule.controller("NotificationCtrl", NotificationCtrl)
notificationModule.directive("lcsNotification", notificationDirective)

export default notificationModule
