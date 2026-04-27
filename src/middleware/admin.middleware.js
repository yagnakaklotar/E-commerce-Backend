const adminMiddleware = (req, res, next) => {
  try {
    // Check karo user logged in hai
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated"
      });
    }

    // Check karo user admin hai
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: "Access denied! Only admin can perform this action"
      });
    }

    next();

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};

module.exports = adminMiddleware;