import Bet from "../../model/bet"
import Match from "../../model/match"
import MatchFactory from "../../service/match"

import EuroDetailCtrl from "./euro/detail/detailCtrl"
import EuroListCtrl from "./euro/list/listCtrl"
import EuroRankCtrl from "./euro/rank/rankCtrl"
import EuroRulesCtrl from "./euro/rules/rulesCtrl"
import EuroScoreCtrl from "./euro/score/scoreCtrl"

import GameConfig from "./game.config"

// Create the module where our functionality can attach to
const gameModule = angular.module("app.game", [])
gameModule.factory("Bet", Bet)
gameModule.factory("Match", Match)
gameModule.factory("MatchFactory", MatchFactory)

gameModule.controller("EuroDetailCtrl", EuroDetailCtrl)
gameModule.controller("EuroListCtrl", EuroListCtrl)
gameModule.controller("EuroRankCtrl", EuroRankCtrl)
gameModule.controller("EuroRulesCtrl", EuroRulesCtrl)
gameModule.controller("EuroScoreCtrl", EuroScoreCtrl)

gameModule.config(GameConfig)

export default gameModule
