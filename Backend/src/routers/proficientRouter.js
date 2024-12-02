const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const {
  getProficientData,
  getReviews,
} = require("../controllers/proficientController");

router.get("/proficient-data", Auth, getProficientData);

router.get("/reviews/:id", Auth, getReviews);
module.exports = router;
