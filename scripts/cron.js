"use strict"

const CronJob = require("cron").CronJob

exports.startCron = () => {
	// Runs every day at 00h30
  const job = new CronJob("00 30 00 * * *", () => {
    // nothing for the moment
  }, () => {
    console.log("Cron job executed")
  })

  job.start()
  console.log("Cronjob started")
}
