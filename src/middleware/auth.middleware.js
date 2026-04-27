const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Token cookies se lo ya headers se
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "No token, access denied"
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id);

      if (!req.user) {
        return res.status(401).json({
          message: "User not found"
        });
      }

      next();

    } catch (error) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};

module.exports = authMiddleware;