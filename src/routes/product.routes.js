const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const upload = require("../middleware/upload");

// CREATE PRODUCT
router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 10),
  productController.createProduct
);

// GET ALL
router.get("/", productController.getAllProducts);

// GET SINGLE
router.get("/:id", productController.getProductById);

// UPDATE
router.put("/:id", authMiddleware, adminMiddleware, productController.updateProduct);

// DELETE
router.delete("/:id", authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;