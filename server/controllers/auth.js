const passport = require('passport')

exports.onlyAuthUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  return res.status(401).send({ errors: { auth: 'Not Authenticated!' } })
}

exports.onlyAdmin = (req, res, next) => {
  const user = req.user

  if (user && user['role'] === 'admin') {
    return next()
  }

  return res.status(401).send({ errors: { auth: 'Not Authorized!' } })
}
