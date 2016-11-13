export default function GlobalFactory($window) {
  return {
    user: window.user,
    authenticated: !!window.user,
    back() {
      $window.history.back()
    },
  }
}
