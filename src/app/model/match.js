import moment from "moment"

export default function Match($rootScope, User, Comment, Bet) {
  "ngInject"

  return (data) => {
    return angular.extend({
      home: "",
      away: "",
      startsAt: Date.now(),
      type: "",
      scoresUpdated: "",
      isBetAuthorize: moment(data.startsAt).isAfter(new Date()),
      hasResults: (data.scoreHome !== undefined && data.scoreAway !== undefined),
      currentBet: data.bets.find((bet) => bet.user._id === $rootScope.currentUser._id) || {
        homeScore: 0,
        awayScore: 0,
        user: new User($rootScope.currentUser),
        isNew: true,
      },

      updateBet() {
        if (this.currentBet.isNew) {
          this.bets.push({
            homeScore: this.currentBet.homeScore,
            awayScore: this.currentBet.awayScore,
            user: $rootScope.currentUser._id,
          })
        } else {
          const bet = this.bets.find((bet) => bet.user._id === $rootScope.currentUser._id)
          bet.homeScore = this.currentBet.homeScore
          bet.awayScore = this.currentBet.awayScore
          bet.created = Date.now()
        }
      },

      setScore(scoreHome, scoreAway) {
        this.scoreHome = scoreHome
        this.scoreAway = scoreAway
      },
    }, data,
      {
        user: new User(data.user),
      },
      {
        bets: (data.bets) ? data.bets.map((bet) => new Bet(bet)) : [],
      },
      {
        comments: (data.comments) ? data.comments.map((comment) => new Comment(comment)) : [],
      },
    )
  }
}
