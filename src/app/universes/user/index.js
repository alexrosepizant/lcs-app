import User from "../../factory/model/user"
import UserFactory from "../../factory/api/user"
import UserConfig from "./user.config"
import ProfileCtrl from "./profile/profileCtrl"

// Create the module where our functionality can attach to
const userModule = angular.module("app.user", [])
userModule.config(UserConfig)
userModule.factory("User", User)
userModule.factory("UserFactory", UserFactory)
userModule.controller("ProfileCtrl", ProfileCtrl)

export default userModule
