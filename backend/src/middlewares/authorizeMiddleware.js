const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User role not defined' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: You do not have access to this resource' })
    }

    next()
  }
}

module.exports = authorize
