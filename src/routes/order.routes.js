const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");
const auth = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// Place order
router.post("/checkout", auth, orderController.ordercart);

// Get my orders
router.get("/", auth, orderController.getMyOrders);

// Get single order
router.get("/:id", auth, orderController.getOrderById);

// Payment route (ADD THIS ✔)
router.put("/pay/:id", auth, orderController.makePayment);

// Update order status (admin only)
router.put("/:id/status", auth, adminMiddleware, orderController.updateOrderStatus);

module.exports = router;