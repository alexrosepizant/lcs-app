export default function Comment(User) {
  return (data) => {
    return angular.extend({
      content: "",
      created: Date.now(),
      username: "",
    }, data, {user: new User(data.user)})
  }
}
