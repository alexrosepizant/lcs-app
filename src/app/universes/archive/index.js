import ArchiveConfig from "./archive.config"
import ArchiveListCtrl from "./list/listCtrl"

// Create the module where our functionality can attach to
const archiveModule = angular.module("app.archive", [])
archiveModule.config(ArchiveConfig)

archiveModule.controller("ArchiveListCtrl", ArchiveListCtrl)

export default archiveModule
