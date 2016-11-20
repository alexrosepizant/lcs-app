/**
 * Generic require login routing middleware
 */
exports.requiresLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(401)
  }
  next()
}
