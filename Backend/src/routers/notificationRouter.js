const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();

const {
  addNotification,
  getNotification,
  updateNotification,
} = require("../controllers/notificationController");

router.post("/add-notification", Auth, addNotification);

router.get("/get-notification/:id", Auth, getNotification);

router.post("/update-notification/:id", Auth, updateNotification);

module.exports = router;
