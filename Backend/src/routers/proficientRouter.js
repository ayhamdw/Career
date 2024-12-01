const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const { getProficientData } = require("../controllers/proficientController");

router.get("/proficient-data/:userId", Auth, getProficientData);

module.exports = router;
