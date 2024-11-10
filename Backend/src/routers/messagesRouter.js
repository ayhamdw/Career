const express = require("express");
const Auth = require("../middleware/auth");
const {
  messageController,
  getMessageBetweenUsersController,
  getChatUserDetails,
} = require("../controllers/messagesController");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../assets/images/")); // Ensure correct path resolution
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = new express.Router();

router.post("/messages", upload.single("imageFile"), Auth, messageController);

router.get("/getChatUserDetails/:userId", Auth, getChatUserDetails);

router.get(
  "/messages/:senderId/:receiverId",
  Auth,
  getMessageBetweenUsersController
);
