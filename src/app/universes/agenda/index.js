import angular from "angular"

import AgendaFactory from "../../api/agenda"
import AgendaConfig from "./agenda.config"
import AgendaListCtrl from "./list/listCtrl"

// Create the module where our functionality can attach to
const agendaModule = angular.module("app.agenda", [])
agendaModule.config(AgendaConfig)
agendaModule.factory("AgendaFactory", AgendaFactory)

agendaModule.controller("AgendaListCtrl", AgendaListCtrl)

export default agendaModule
