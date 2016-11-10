import angular from "angular"

import VoteFactory from "../../api/vote"
import VoteConfig from "./vote.config"
import VoteListCtrl from "./list/listCtrl"

// Create the module where our functionality can attach to
const voteModule = angular.module("app.vote", [])
voteModule.config(VoteConfig)
voteModule.factory("VoteFactory", VoteFactory)

voteModule.controller("VoteListCtrl", VoteListCtrl)

export default voteModule
