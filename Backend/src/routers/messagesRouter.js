const express = require("express");
const Auth = require("../middleware/auth");
const {
  messageController,
  getMessageBetweenUsersController,
  getChatUserDetails,
} = require("../controllers/messagesController");
const upload = require("../utils/SaveImageFile");

const router = new express.Router();

router.post("/messages", upload.single("imageFile"), Auth, messageController);

router.get("/getChatUserDetails/:userId", Auth, getChatUserDetails);

router.get(
  "/messages/:senderId/:receiverId",
  Auth,
  getMessageBetweenUsersController
);

module.exports = router;
