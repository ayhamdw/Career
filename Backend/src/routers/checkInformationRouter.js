const express = require("express");
const router = new express.Router();

const {
  checkUserNameController,
  checkEmailController,
} = require("../controllers/checkInformationController");

router.post("/username", checkUserNameController);

router.post("/email", checkEmailController);

module.exports = router;
