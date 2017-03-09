import io from "socket.io-client"

export default function SocketFactory($rootScope) {
  "ngInject"

  const socket = io.connect()

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
