import ParameterFactory from "../../../service/parameter"
import CategoryCtrl from "./categoryCtrl"
import lcsCategory from "./lcsCategory"

// Create the module where our functionality can attach to
const categoryModule = angular.module("app.category", [])
categoryModule.factory("ParameterFactory", ParameterFactory)
categoryModule.controller("CategoryCtrl", CategoryCtrl)
categoryModule.directive("lcsCategory", lcsCategory)

export default categoryModule
