import io from "socket.io-client/socket.io"

export default function SocketFactory($rootScope, AppConstants) {
  const socket = io.connect("http://" + AppConstants.url + ":" + AppConstants.port)

  return {
    on(eventName, callback) {
      socket.on(eventName, function() {
        const args = arguments
        $rootScope.$apply(function() {
          callback.apply(socket, args)
        })
      })
    },
    emit(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        const args = arguments
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args)
          }
        })
      })
    },
  }
}
