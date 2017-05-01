"use strict"

/**
* Module dependencies.
*/
const nodemailer = require("nodemailer")

const credentials = require("../credentials")
const Users = require("./user")
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: credentials.gmail,
})

/**
* Send email
*/
exports.send = (options) => {
  if (process.env.NODE_ENV !== "production") {
    return
  }

  const mailOptions = {
    from: "'Les coqs soccer' <lescoqssoccer@gmail.com>",
    to : options.to,
    subject : options.subject,
    text : options.text,
    html: options.html,
  }

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error)
      return error
    } else {
      console.log(response)
      return response
    }
  })
}

const getUserEmails = (mailType) => {
  return Users.team()
    .then((users) => {
      return users.filter((user) => {
        return user.settings.allMail || user.settings[mailType]
      }).map((user) => user.email)
    })
}

exports.sendToAll = (mailType, options) => {
  getUserEmails(mailType)
    .then((emails) => {
      this.send(Object.assign({
        to: emails,
      }, options))
    })
}
