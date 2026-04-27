const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");

const app = express();

// ⬇️ YE 2 LINES ADD KARO (Important!)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // ← YE ADD KARO!

app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("E-commerce API is running");
});

module.exports = app;