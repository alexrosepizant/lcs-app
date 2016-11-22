import HomeConfig from "./home.config"

// Create the module where our functionality can attach to
const homeModule = angular.module("app.home", [])
homeModule.config(HomeConfig)

export default homeModule
