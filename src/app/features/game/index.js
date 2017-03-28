import Bet from "../../model/bet"
import Match from "../../model/match"
import MatchFactory from "../../service/match"

import EuroDetailCtrl from "./euro/match/detail/detailCtrl"
import EuroTeamCtrl from "./euro/team/teamCtrl"
import EuroMatchCtrl from "./euro/match/list/listCtrl"
import EuroRankCtrl from "./euro/rank/rankCtrl"
import EuroRulesCtrl from "./euro/rules/rulesCtrl"
import EuroScoreCtrl from "./euro/score/scoreCtrl"
import SideMenuCtrl from "./euro/menu/sideMenuCtrl"
import lcsEuroSidebar from "./euro/menu/sideMenuDirective"

import GameConfig from "./game.config"

// Create the module where our functionality can attach to
const gameModule = angular.module("app.game", [])
gameModule.factory("Bet", Bet)
gameModule.factory("Match", Match)
gameModule.factory("MatchFactory", MatchFactory)

gameModule.controller("EuroDetailCtrl", EuroDetailCtrl)
gameModule.controller("EuroTeamCtrl", EuroTeamCtrl)
gameModule.controller("EuroMatchCtrl", EuroMatchCtrl)
gameModule.controller("EuroRankCtrl", EuroRankCtrl)
gameModule.controller("EuroRulesCtrl", EuroRulesCtrl)
gameModule.controller("EuroScoreCtrl", EuroScoreCtrl)
gameModule.controller("SideMenuCtrl", SideMenuCtrl)
gameModule.directive("lcsEuroSidebar", lcsEuroSidebar)

gameModule.config(GameConfig)

export default gameModule
