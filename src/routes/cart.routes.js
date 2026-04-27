const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/add", authMiddleware, cartController.addtocart);
router.get("/", authMiddleware, cartController.getCart);
router.put("/update/:productId", authMiddleware, cartController.updateCartQuantity);
router.delete("/remove/:productId", authMiddleware, cartController.removeFromCart);
router.delete("/clear", authMiddleware, cartController.clearCart);

module.exports = router;