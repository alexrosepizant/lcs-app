import Idea from "../../model/idea"
import IdeaFactory from "../../service/idea"
import AboutConfig from "./about.config"
import AboutListCtrl from "./list/listCtrl"
import CreateIssueCtrl from "./creation/createCtrl"

// Create the module where our functionality can attach to
const aboutModule = angular.module("app.about", [])
aboutModule.config(AboutConfig)
aboutModule.factory("IdeaFactory", IdeaFactory)
aboutModule.factory("Idea", Idea)
aboutModule.controller("AboutListCtrl", AboutListCtrl)
aboutModule.controller("CreateIssueCtrl", CreateIssueCtrl)

export default aboutModule
