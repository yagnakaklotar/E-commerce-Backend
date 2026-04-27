const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: Number
        }
    ],

    totalAmount:{
        type: Number
    },

    status:{
        type: String,
        enum:["pending","confirmed", "shipped", "delivered"],
        default: "pending"
    }
}, {timestamps: true})

// Last line missing hai
module.exports = mongoose.model("cart", cartSchema);  // ⬅️ Ye add karo