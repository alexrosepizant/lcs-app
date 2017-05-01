const mail = require("../controllers/mail")

module.exports = (app) => {
  app.get("/mail/send",function(req, res) {
    mail.send(req.query)
      .then((status, err) => {
        if (err) {
          res.status(400).json(err)
        } else {
          res.jsonp(status)
        }
      })
  })
}
