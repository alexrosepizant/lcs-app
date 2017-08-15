const http = require("http")
const mongoose = require("mongoose")
const app = require("./utils").bootstrapApp()
const config = require("./config")

/**
Socket server
**/
const server = http.Server(app)
const io = require("socket.io").listen(server) // eslint-disable-line
const socket = require("./routes/socket.js")

io.sockets.on("connection", socket)

/**
App endPoint entry
**/
app.get("/", (req, res) => {
  if (req.user) {
    res.cookie("user", JSON.stringify(req.user.user_info))
  }
})

/**
DB connection and server start
**/
mongoose.Promise = global.Promise
mongoose.connect(config.db, {
  server:{
    auto_reconnect:true,
  },
}, (err) => {
  if (err) {
    console.error("Could not connect to MongoDB! " + err)
  }  else {
    server.listen(config.port, () => {
      console.log("Express app started on port " + config.port)
    })
  }
})

/**
Start cronjob
**/
const cronjob = require("../scripts/cron.js") // eslint-disable-line
cronjob.startCron()
