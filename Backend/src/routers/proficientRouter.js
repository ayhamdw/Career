const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const {
  getProficientData,
  getReviews,
  createBooking,
} = require("../controllers/proficientController");

router.get("/proficient-data", Auth, getProficientData);

router.get("/reviews/:id", Auth, getReviews);

router.post("/booking-proficient", Auth, createBooking);
module.exports = router;
