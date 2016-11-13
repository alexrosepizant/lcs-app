import AuthFactory from "../../factory/api/auth"
import AuthConfig from "./auth.config"
import LoginCtrl from "./login/loginCtrl"
import SignupCtrl from "./signup/signupCtrl"

// Create the module where our functionality can attach to
const authModule = angular.module("app.auth", [])
authModule.config(AuthConfig)
authModule.factory("AuthFactory", AuthFactory)

authModule.controller("LoginCtrl", LoginCtrl)
authModule.controller("SignupCtrl", SignupCtrl)

export default authModule
