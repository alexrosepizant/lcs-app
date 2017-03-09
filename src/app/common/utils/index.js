import ngEnter from "./ngEnter"

// Create the module where our functionality can attach to
const utilsModule = angular.module("app.utils", [])
utilsModule.directive("ngEnter", ngEnter)

export default utilsModule
