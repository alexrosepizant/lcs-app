export default function AuthConfig($stateProvider) {
  "ngInject"

  $stateProvider
    .state("login", {
      url: "/login",
      template: require("./login/login.html"),
      controller: "LoginCtrl",
      title: "Login",
    })
    .state("signup", {
      url: "/signup",
      template: require("./signup/signup.html"),
      controller: "SignupCtrl",
      title: "Signup",
    })
}
