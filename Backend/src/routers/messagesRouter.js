const express = require("express");
const Auth = require("../middleware/auth");
const router = new express.Router();
const {
  messageController,
  getMessageBetweenUsersController,
  getChatUserDetails,
} = require("../controllers/messagesController");
const upload = require("../utils/SaveImageFile");

router.post("/messages", upload.single("imageFile"), Auth, messageController);

router.get("/getChatUserDetails/:userId", Auth, getChatUserDetails);

router.get(
  "/messages/:senderId/:receiverId",
  Auth,
  getMessageBetweenUsersController
);

module.exports = router;
