export default function Bet(User) {
  "ngInject"

  return (data) => {
    return angular.extend({
      created: Date.now(),
      homeScore: 0,
      awayScore: 0,
      score: 0,
    }, data,
      {
        user: new User(data.user),
      },
    )
  }
}
