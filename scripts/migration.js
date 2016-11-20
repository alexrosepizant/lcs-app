/**
 * Global dependencies includes db models and routes.
 */
const mongoose = require("mongoose")
const config = require("../server/config")
const app = require("../server/bootstrap")

// Bootstrap db connection
app.bootstrapApp()
mongoose.Promise = global.Promise
mongoose.connect(config.db)

const showLog = (value) => {
  console.log("")
  console.log("-------------------------")
  console.log(value)
  console.log("-------------------------")
  console.log("")
}

/**
Execute function of any module here
**/
const albumController = require("../server/controllers/albums")
const conversationController = require("../server/controllers/conversations")

Promise.resolve()
  .then(() => {
    showLog("Start script migration...")
  })
  .then(() => {
    showLog("Prepare to migration albums")
    return albumController.migrateAlbums()
  })
  .then(() => {
    showLog("Prepare to migration conversations")
    return conversationController.migrateConversation()
  })
  .then(() => {
    showLog("Script migration ended")
    process.exit(-1)
  })
  .catch((err) => {
    console.error(err)
    endScript()
  })
