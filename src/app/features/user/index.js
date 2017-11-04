import User from "../../model/user"
import UserFactory from "../../service/user"
import UserConfig from "./user.config"
import ProfileCtrl from "./profile/profileCtrl"
import RemoveContentCtrl from "./deletion/removeContentCtrl"
import UserCard from "./component/card/card.component"
import UserThumbnail from "./component/card/thumbnail.component"

// Create the module where our functionality can attach to
const userModule = angular.module("app.user", [])
userModule.config(UserConfig)
userModule.factory("User", User)
userModule.factory("UserFactory", UserFactory)
userModule.controller("ProfileCtrl", ProfileCtrl)
userModule.controller("RemoveContentCtrl", RemoveContentCtrl)

userModule.component("userCard", UserCard)
userModule.component("userThumbnail", UserThumbnail)

export default userModule
