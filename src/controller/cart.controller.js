const Cart = require("../model/cart.model");

async function addtocart(req, res) {
  try {
    const { productId, quantity } = req.body;

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

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const productIndex = cart.products.findIndex(
      p => p.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        message: "Product not in cart"
      });
    }

    if (quantity <= 0) {
      cart.products.splice(productIndex, 1);
    } else {
      cart.products[productIndex].quantity = quantity;
    }

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