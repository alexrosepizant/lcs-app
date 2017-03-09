import ArchiveConfig from "./archive.config"

// Create the module where our functionality can attach to
const archiveModule = angular.module("app.archive", [])
archiveModule.config(ArchiveConfig)

export default archiveModule
