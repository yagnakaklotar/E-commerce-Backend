const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

async function addtocart(req, res) {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "Product ID and quantity required"
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: `Sorry! ${product.name} - Only ${product.stock} available, you ordered ${quantity}`
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        products: [{ product: productId, quantity }]
      });
    } else {
      const index = cart.products.findIndex(
        p => p.product.toString() === productId
      );

      if (index > -1) {
        cart.products[index].quantity += quantity || 1;
      } else {
        cart.products.push({
          product: productId,
          quantity: quantity || 1
        });
      }

      await cart.save();
    }

    return res.status(200).json({
      message: "Added to cart",
      cart
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
}

async function getCart(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("products.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      cart
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
}

async function updateCartQuantity(req, res) {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID required"
      });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    let cart = await Cart.findOne({ user: req.user._id })
      .populate("products.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const productIndex = cart.products.findIndex(
      p => p.product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        message: "Product not in cart"
      });
    }

    if (cart.products[productIndex].product.stock < quantity) {
      return res.status(400).json({
        message: `Only ${cart.products[productIndex].product.stock} items available`
      });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();

    return res.status(200).json({
      message: "Cart updated successfully",
      cart
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
}

async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.products = cart.products.filter(
      p => p.product.toString() !== productId
    );

    await cart.save();

    return res.status(200).json({
      message: "Product removed from cart",
      cart
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
}

async function clearCart(req, res) {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.products = [];
    await cart.save();

    return res.status(200).json({
      message: "Cart cleared successfully",
      cart
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
}

module.exports = {
  addtocart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart
};