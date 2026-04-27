const mongoose = require("mongoose")



const productSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
        },
        description:{
            type: String
        },
        price:{
            type:Number,
            required: true
        },
        stock:{
            type: Number,
            default: 0
        },
        image:{
            type: String
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
}, {timestamps: true})

// Last line missing hai
module.exports = mongoose.model("product", productSchema);  