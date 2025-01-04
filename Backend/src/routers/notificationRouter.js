const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();

const {
  addNotification,
  getNotification,
  updateNotification,
  rateProficient,
  pushNotification,
} = require("../controllers/notificationController");

router.post("/add-notification", Auth, addNotification);

router.get("/get-notification/:id", Auth, getNotification);

router.post("/update-notification/:id", Auth, updateNotification);

router.post("/rate-proficient/:currentNotificationId", Auth, rateProficient);

router.post("/push-notification", Auth, pushNotification);

module.exports = router;
