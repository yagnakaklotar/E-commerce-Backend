const Cart = require("../model/cart.model");
const Order = require("../model/order.model");
const Product = require("../model/product.model");


// PLACE ORDER
async function ordercart(req, res) {
  try {

    const cart = await Cart.findOne({
      user: req.user._id
    }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    // Stock Check + Reduce
    for (let item of cart.products) {

      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`
        });
      }

      product.stock -= item.quantity;

      await product.save();
    }


    // Total Calculate
    let total = 0;

    cart.products.forEach(item => {
      total += item.product.price * item.quantity;
    });


    // Create Order
    const order = await Order.create({
      user: req.user._id,
      products: cart.products,
      totalAmount: total
    });


    // Clear Cart
    cart.products = [];
    await cart.save();

    return res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (err) {

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }
}



// GET MY ORDERS
async function getMyOrders(req, res) {

  try {

    const orders = await Order.find({
      user: req.user._id
    }).populate("products.product");

    return res.status(200).json({
      message: "Orders fetched successfully",
      count: orders.length,
      orders
    });

  } catch (err) {

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }

}



// GET SINGLE ORDER
async function getOrderById(req, res) {

  try {

    const order = await Order.findById(req.params.id)
      .populate("products.product")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order
    });

  } catch (err) {

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }

}



// UPDATE ORDER STATUS
async function updateOrderStatus(req, res) {

  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = status;

    await order.save();

    return res.status(200).json({
      message: "Order status updated",
      order
    });

  } catch (err) {

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }

}



// PAYMENT MOCK
async function makePayment(req, res) {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.paymentStatus = "paid";
    order.paymentMethod = "UPI";


    await order.save();

    return res.status(200).json({
      message: "Payment successful",
      order
    });

  } catch (err) {

    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }

}



module.exports = {
  ordercart,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  makePayment
};