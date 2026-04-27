const User = require("../model/user.model");

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
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true
    });

    return res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};


module.exports = {
  register,
  login
};