import angular from "angular"

import UserFactory from "../../api/user"
import UserConfig from "./user.config"
import ProfileCtrl from "./profile/profileCtrl"

// Create the module where our functionality can attach to
const userModule = angular.module("app.user", [])
userModule.config(UserConfig)
userModule.factory("UserFactory", UserFactory)
userModule.controller("ProfileCtrl", ProfileCtrl)

export default userModule
