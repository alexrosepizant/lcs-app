import Issue from "../../factory/model/issue"
import IssueFactory from "../../factory/api/issue"
import AboutConfig from "./about.config"
import AboutListCtrl from "./list/listCtrl"
import CreateIssueCtrl from "./creation/createCtrl"

// Create the module where our functionality can attach to
const aboutModule = angular.module("app.about", [])
aboutModule.config(AboutConfig)
aboutModule.factory("IssueFactory", IssueFactory)
aboutModule.factory("Issue", Issue)
aboutModule.controller("AboutListCtrl", AboutListCtrl)
aboutModule.controller("CreateIssueCtrl", CreateIssueCtrl)

export default aboutModule
