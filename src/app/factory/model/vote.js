export default function Vote(User) {
  return (data) => {
    return angular.extend({
      content: "",
      created: Date.now(),
    }, data, {user: new User(data.user)})
  }
}
