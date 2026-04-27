const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const upload = require("../middleware/upload");

// ⬇️ ORDER IMPORTANT - UPLOAD PEHLE, CONTROLLER BAAD!
router.post(
  "/create", 
  authMiddleware, 
  adminMiddleware, 
  upload.array('images', 10),  // ← PEHLE!
  productController.createProduct  // ← BAAD!
);

// GET ALL PRODUCTS
router.get("/", productController.getAllProducts);

// GET SINGLE PRODUCT
router.get("/:id", productController.getProductById);

// UPDATE PRODUCT
router.put("/:id", authMiddleware, adminMiddleware, productController.updateProduct);

// DELETE PRODUCT
router.delete("/:id", authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;