const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

// Signup a new user
exports.signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    // Check if user already exists
    const isalready = await User.findOne({ email });
    if (isalready) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    //check if userName is already taken
    const isalreadyUserName = await User.findOne({ userName });
    if (isalreadyUserName) {
      return res.status(400).json({
        error: "UserName already exists",
      });
    }
    //check the length of the password
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }
    const user = await User.create({ userName, email, password });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(500).json({
      error: "Error signing up user",
      err,
    });
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
        message: "Incorrect email or password",
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

exports.googleLogin = async (req, res, next) => {
  const { idToken } = req.body;
  try {
    client
      .verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then(async (ticket) => {
        const {
          payload: { sub, name, email },
        } = ticket;
        const user = await User.findOne({ email });
        if (!user) {
          const hashedPassword = await bcryptjs.hash(sub, 12);
          const firstName = name.split(" ")[0];
          const lastName = name.split(" ")[1];
          const newUser = new User({
            userName: firstName + lastName,
            email,
            password: hashedPassword,
          });
          await newUser.save();
          const token = newUser.getSignedJwtToken();
          res.status(200).json({
            success: true,
            message: "User logged in",
            token,
            newUser: {
              ...newUser._doc,
              password: null,
            },
          });
        } else {
          const token = user.getSignedJwtToken();
          await user.save();
          res.status(200).json({
            success: true,
            message: "User logged in",
            token,
            user: {
              ...user._doc,
              password: null,
            },
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
