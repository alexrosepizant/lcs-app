
const path= require("path")

const publicPath = path.join(__dirname, "../../src/public/")

exports.render = function(req, res) {
  res.sendFile(path.join(publicPath, "index.html"), {
    user: req.user ? JSON.stringify(req.user) : "null",
  })
}
