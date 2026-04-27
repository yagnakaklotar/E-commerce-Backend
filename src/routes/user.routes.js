const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;