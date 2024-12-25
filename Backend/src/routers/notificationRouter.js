const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();

const { addNotification } = require("../controllers/notificationController");

router.post("/add-notification", Auth, addNotification);

module.exports = router;
