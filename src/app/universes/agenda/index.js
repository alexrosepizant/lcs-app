import UserEvent from "../../factory/model/userEvent"
import AgendaFactory from "../../factory/api/agenda"
import AgendaConfig from "./agenda.config"
import AgendaListCtrl from "./list/listCtrl"
import CreateEventCtrl from "./creation/createCtrl"

// Create the module where our functionality can attach to
const agendaModule = angular.module("app.agenda", [])
agendaModule.config(AgendaConfig)
agendaModule.factory("UserEvent", UserEvent)
agendaModule.factory("AgendaFactory", AgendaFactory)

agendaModule.controller("AgendaListCtrl", AgendaListCtrl)
agendaModule.controller("CreateEventCtrl", CreateEventCtrl)

export default agendaModule
