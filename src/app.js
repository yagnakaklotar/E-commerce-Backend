const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes"); 

app.use(express.json());

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes); 

module.exports = app;