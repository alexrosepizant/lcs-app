/**
* Global dependencies includes db models and routes.
*/
const mongoose = require("mongoose")
const config = require("../../server/config")
const utils = require("../../server/utils")

// Bootstrap db connection
utils.bootstrapApp()
mongoose.Promise = global.Promise

/**
Define functions
**/
const matchs = require("../../server/controllers/match")

/**
Execute Scripts
**/
mongoose.connect(config.db)
.then(() => {
  utils.titleLog("Start script migration...")
})
.then(() => {
  utils.titleLog("Prepare to reset user euro scores and matchs")
  return matchs.reInitEuroPoints()
})
.then(() => {
  utils.titleLog("Prepare to update scores")
  return matchs.updateScores()
})
.then(() => {
  // utils.titleLog("Prepare to import data")
  // const EuroData = require("../../server/ressources/euro.json")
  // const EuroDataR16 = require("../../server/ressources/euro_qf.json")
  // const EuroDataQF = require("../../server/ressources/euro_qf_2.json")
  // const EuroDatasSF = require("../../server/ressources/euro_SF.json")
  // const EuroDatasFi = require("../../server/ressources/euro_Fi.json")
  // return matchs.loadMatchsFromJson(EuroData)
  //   .then(() => matchs.loadMatchsFromJson(EuroDataR16))
  //   .then(() => matchs.loadMatchsFromJson(EuroDataQF))
  //   .then(() => matchs.loadMatchsFromJson(EuroDatasSF))
  //   .then(() => matchs.loadMatchsFromJson(EuroDatasFi))
})
.then(() => {
  utils.titleLog("Script migration ended")
  process.exit(-1)
})
.catch((err) => {
  utils.titleLog(err)
  process.exit(-1)
})
