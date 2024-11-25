const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const upload = require("../utils/SaveImageFile");
const {
  signupController,
  signinController,
  logoutController,
  logoutAllController,
  checkUserNameController,
} = require("../controllers/authController");
router.post("/register", upload.single("imageFile"), signupController);

router.post("/login", signinController);

router.post("/logout", Auth, logoutController);

router.post("/logoutAll", Auth, logoutAllController);

module.exports = router;
