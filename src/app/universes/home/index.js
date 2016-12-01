import HomeFactory from "../../factory/api/home"
import HomeCtrl from "./dashboard/homeCtrl"
import HomeConfig from "./home.config"

// Create the module where our functionality can attach to
const homeModule = angular.module("app.home", [])
homeModule.config(HomeConfig)
homeModule.factory("HomeFactory", HomeFactory)
homeModule.controller("HomeCtrl", HomeCtrl)

export default homeModule
