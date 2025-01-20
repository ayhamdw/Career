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
  getAllEmails,
  getAllUsernames,
  verifyCode,
  signinWithGoogle,
  validateEmail,
  signupWithGoogle,

} = require("../controllers/authController");

router.post("/register", upload.single("imageFile"), signupController);

router.post("/login", signinController);
router.post("/signin-google", signinWithGoogle);
router.post("/signup-google", signupWithGoogle);

router.post("/logout", Auth, logoutController);

router.post("/logoutAll", Auth, logoutAllController);
router.post("/validate-email", validateEmail);

router.get("/emails", getAllEmails);

router.get("/usernames", getAllUsernames);

router.post("/verify-code", verifyCode);

module.exports = router;
