const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");
const auth = require("../middleware/auth.middleware");

router.post("/checkout", auth, orderController.ordercart);
router.get("/", auth, orderController.getMyOrders);
router.get("/:id", auth, orderController.getOrderById);
router.put("/:id/pay", auth, orderController.makePayment);

module.exports = router;