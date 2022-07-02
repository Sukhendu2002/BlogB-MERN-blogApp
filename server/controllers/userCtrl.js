const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

// Signup a new user
exports.signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    const user = await User.create({ userName, email, password });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};

// Login a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });

    // next(new ErrorResponse("Please enter all fields", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      message: "Error logging in user",
      error: err,
    });
  }
};

// Forgot password
exports.forgetPassword = async (req, res, next) => {
  res.send("signup");
};

// Reset password
exports.resetPassword = async (req, res, next) => {
  res.send("signup");
};


// Send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
