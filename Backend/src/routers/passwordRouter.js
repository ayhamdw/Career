const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const {
  forgotPasswordController,
  resetPasswordController,
  oldPasswordChecker,
} = require("../controllers/passwordController");

router.get("/oldPassword", Auth, oldPasswordChecker);

router.post("/forgotPassword", forgotPasswordController);

router.post("/resetPassword", resetPasswordController);

module.exports = router;
