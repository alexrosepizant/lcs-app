const path= require("path")
const http = require("http")
const httpProxy = require("http-proxy")
const mongoose = require("mongoose")
const app = require("./bootstrap").bootstrapApp()
const config = require("./config")

const proxy = httpProxy.createProxyServer()
const isProduction = process.env.NODE_ENV === "production"
const host = process.env.APP_HOST || "localhost"
const port = isProduction ? 80 : 3000
const publicPath = path.join(__dirname, "/../src/")

// Webpack dev server
if (!isProduction) {
  app.all(["/dist/*", "*.hot-update.json"], (req, res) => {
    proxy.web(req, res, {
      target: "http://" + host + ":3001",
    })
  })

  proxy.on("error", () => {
    console.log("Could not connect to proxy, please try again...")
  })
}

// start socket server
const socket = require("./routes/socket.js")

const server = http.Server(app)
io = require("socket.io")(server)

io.sockets.on("connection", socket)

// Define route for app
app.get("/*", (req, res) => {
  if (req.user) {
    res.cookie("user", JSON.stringify(req.user.user_info))
  }

  res.sendFile(path.join(publicPath, "index.html"))
})

// Connect to MongoDB and start server
mongoose.Promise = global.Promise
mongoose.connect(config.db, {
  server:{
    auto_reconnect:true,
  },
}, (err) => {
  if (err) {
    console.error("Could not connect to MongoDB! " + err)
  }  else {
    // Start server
    server.listen(port, () => {
      console.log("Express app started on port " + port)
    })
  }
})

// Start cron: need to import after mongoose models
const cronjob = require("../scripts/cron.js") // eslint-disable-line

cronjob.startCron()
