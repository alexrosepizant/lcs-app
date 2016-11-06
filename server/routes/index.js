"use strict"

const mongoose = require("mongoose")
const index = require("../controllers/index")

const User = mongoose.model("User")

module.exports = function(app) {

	// Home route
  app.get("/*", function(req, res) {
    if (!req.isAuthenticated()) {
      console.log("/ signin")
      res.redirect("/signin")
    } else {
      console.log("/ else")
      User.findOne({
        _id: req.user._id,
      }).exec(function(err, user) {
        if (user && user.exclude) {
          req.logout()
          res.redirect("/signin")
        } else {
          index.render(req, res)
        }
      })
    };
  })
}
