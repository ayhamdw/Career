const express = require("express");
const Auth = require("../middleware/auth");
const {
  getAllPosts,
  getSpecificData,
} = require("../controllers/jobsController");
const router = express.Router();

router.get("/all-posts/:searchJob", Auth, getAllPosts);

router.get("/specific-data/:data", Auth, getSpecificData);

module.exports = router;
