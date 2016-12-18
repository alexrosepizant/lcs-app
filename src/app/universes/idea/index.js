import Idea from "../../factory/model/idea"
import IdeaFactory from "../../factory/api/idea"
import IdeaConfig from "./idea.config"
import IdeaListCtrl from "./list/listCtrl"
import CreateIdeaCtrl from "./creation/createCtrl"

// Create the module where our functionality can attach to
const ideaModule = angular.module("app.idea", [])
ideaModule.config(IdeaConfig)
ideaModule.factory("IdeaFactory", IdeaFactory)
ideaModule.factory("Idea", Idea)

ideaModule.controller("IdeaListCtrl", IdeaListCtrl)
ideaModule.controller("CreateIdeaCtrl", CreateIdeaCtrl)

export default ideaModule
