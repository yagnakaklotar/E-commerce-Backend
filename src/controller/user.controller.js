const User = require("../model/user.model");
const sendEmail = require("../utils/sendEmail");
const cookieParser = require("cookie-parser");


// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true
    });

    return res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};


// LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();


    res.cookie("token", token, {
      httpOnly: true
    });

    // LOGIN EMAIL
    await sendEmail(
      user.email,
      "Login Alert",
      "You just logged into your account."
    );

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports = {
  register,
  login
};