const express = require("express");
const Auth = require("../middleware/auth");
const { getAllPosts } = require("../controllers/jobsController");
const router = express.Router();

router.get("/all-posts/:searchJob", Auth, getAllPosts);

module.exports = router;
