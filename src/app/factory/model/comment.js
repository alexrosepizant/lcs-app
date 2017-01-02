export default function Comment(User) {
  return (data) => {
    return angular.extend({
      content: "",
      created: Date.now(),
      username: "",
      replies: data.replies.map((reply) => {
        reply.user = new User(reply.user)
      }) || [],
    }, data, {
      user: new User(data.user),
    })
  }
}
