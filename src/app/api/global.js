export default function GlobalFactory($window) {

  const _this = this
  _this._data = {
    user: window.user,
    authenticated: !!window.user,
    back() {
      $window.history.back()
    },
  }

  return _this._data
}
