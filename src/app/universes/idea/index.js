import IdeaFactory from "../../factory/api/idea"
import IdeaConfig from "./idea.config"
import IdeaListCtrl from "./list/listCtrl"

// Create the module where our functionality can attach to
const ideaModule = angular.module("app.idea", [])
ideaModule.config(IdeaConfig)
ideaModule.factory("IdeaFactory", IdeaFactory)

ideaModule.controller("IdeaListCtrl", IdeaListCtrl)

export default ideaModule
