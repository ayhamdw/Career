const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const {
  getProficientData,
  getReviews,
  createBooking,
  requestDetails,
  senderDetails,
  acceptRequest,
} = require("../controllers/proficientController");

router.get("/proficient-data", Auth, getProficientData);

router.get("/reviews/:id", Auth, getReviews);

router.post("/booking-proficient", Auth, createBooking);

router.get("/requestDetails/:id", Auth, requestDetails);

router.get("/sender-details/:id", Auth, senderDetails);

router.post("/request-action", Auth, acceptRequest);

module.exports = router;
