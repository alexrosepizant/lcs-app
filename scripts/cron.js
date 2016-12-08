"use strict"

const CronJob = require("cron").CronJob
const votes = require("../server/controllers/votes")

exports.startCron = () => {
	// Runs every day at 00h30
  const job = new CronJob("00 30 00 * * *", () => {
    votes.closeVotes()
  }, () => {
    console.log("Cron job executed")
  })

  job.start()
  console.log("Cronjob started")
}
