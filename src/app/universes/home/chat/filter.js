export default function FilterConnectedUser() {
  return function(input, scope) {
    const inputArray = []

    for (const item in input) {
      inputArray.push(input[item])
    }

    return inputArray.filter(function(v) {
      return scope.connectedUsers.indexOf(v.username) !== -1 && scope.currentUser.username !== v.username
    })
  }
}
