const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        quantity: Number
    }],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {             
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    paymentStatus:{
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
    paymentMethod:{
        type: String,
        enum:["COD", "UPI", "Card"]
    }

}, {timestamps: true});

module.exports = mongoose.model("order", orderSchema);  