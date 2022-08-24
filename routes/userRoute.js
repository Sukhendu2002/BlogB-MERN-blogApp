const Router = require("express").Router;
const router = Router();

const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  googleLogin,
} = require("../controllers/userCtrl");

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/forgetpassword").post(forgetPassword);

router.route("/resetpassword/:resetToken").put(resetPassword);

router.route("/googlelogin").post(googleLogin);

module.exports = router;
