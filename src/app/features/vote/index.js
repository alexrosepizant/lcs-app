import Vote from "../../model/vote"
import VoteFactory from "../../service/vote"
import VoteConfig from "./vote.config"
import VoteListCtrl from "./list/listCtrl"
import VoteCreationCtrl from "./creation/createCtrl"

// Create the module where our functionality can attach to
const voteModule = angular.module("app.vote", [])
voteModule.config(VoteConfig)
voteModule.factory("Vote", Vote)
voteModule.factory("VoteFactory", VoteFactory)

voteModule.controller("VoteListCtrl", VoteListCtrl)
voteModule.controller("VoteCreationCtrl", VoteCreationCtrl)

export default voteModule
