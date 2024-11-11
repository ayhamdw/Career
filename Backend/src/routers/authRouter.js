const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const {
  signupController,
  signinController,
  logoutController,
  logoutAllController,
  checkUserNameController,
} = require("../controllers/authController");
router.post("/signup", signupController);

router.post("/login", signinController);

router.post("/logout", Auth, logoutController);

router.post("/logoutAll", Auth, logoutAllController);

module.exports = router;
