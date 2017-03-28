import ngEnter from "./ngEnter"
import setClassWhenAtTop from "./setClassAtTop"

// Create the module where our functionality can attach to
const utilsModule = angular.module("app.utils", [])
utilsModule.directive("ngEnter", ngEnter)
utilsModule.directive("setClassWhenAtTop", setClassWhenAtTop)

export default utilsModule
