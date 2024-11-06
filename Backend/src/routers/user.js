const express = require("express");
const Auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const {
  signinController,
  signupController,
  logoutController,
  logoutAllController,
  oldPasswordChecker,
  logInUsers,
  sendFiendRequestController,
  getFriendsRequest,
  acceptFriendRequestController,
  acceptedFriendsController,
  messageController,
  getChatUserDetails,
  getMessageBetweenUsersController,
} = require("../controllers/userController");

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
const {
  sendWelcomeEmail,
  sendCancellationEmail,
} = require("../emails/account");
const router = new express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/signup", signupController);

router.post("/login", signinController);

router.post("/logout", Auth, logoutController);

router.post("/logoutAll", Auth, logoutAllController);

router.get("/oldPassword", Auth, oldPasswordChecker);

router.get("/logInUsers/:userId", Auth, logInUsers);

router.post("/send-friend-request", Auth, sendFiendRequestController);

router.get("/getFriendsRequest/:userId", Auth, getFriendsRequest);

router.post("/acceptFriendRequest", Auth, acceptFriendRequestController);

router.get("/acceptedFriends/:userId", Auth, acceptedFriendsController);

router.post("/messages", upload.single("imageFile"), Auth, messageController);

router.get("/getChatUserDetails/:userId", Auth, getChatUserDetails);

router.get(
  "/messages/:senderId/:receiverId",
  Auth,
  getMessageBetweenUsersController
);

// router.get("/users/me", Auth, async (req, res) => {
//   res.send(req.user);
// });

// router.patch("/users/me", Auth, async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "password", "age"];

//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "invalid updates" });
//   }
//   try {
//     const user = req.user;

//     updates.forEach((update) => (user[update] = req.body[update]));

//     await user.save();
//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.delete("/users/me", Auth, async (req, res) => {
//   try {
//     await req.user.remove();
//     //sendCancellationEmail(req.user.email, req.user.name)
//     res.send(req.user);
//   } catch (error) {
//     res.status(400).send();
//   }
// });

// const upload = multer({
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error("Please upload a valid image file"));
//     }
//     cb(undefined, true);
//   },
// });

// router.post(
//   "/users/me/avatar",
//   Auth,
//   upload.single("upload"),
//   async (req, res) => {
//     const buffer = await sharp(req.file.buffer)
//       .resize({ width: 250, height: 250 })
//       .png()
//       .toBuffer();
//     req.user.avatar = buffer;
//     await req.user.save();
//     res.send({ message: "successfully uploaded" });
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

// router.delete("/users/me/avatar", Auth, async (req, res) => {
//   req.user.avatar = undefined;
//   await req.user.save();
//   res.send({ message: "successfully deleted" });
// });

// router.get("/users/me/avatar", Auth, async (req, res) => {
//   try {
//     const user = req.user;

//     if (!user.avatar) {
//       throw new Error({ error: "no avatar found" });
//     }

//     res.set("content-type", "image/png");
//     res.send(user.avatar);
//   } catch (error) {
//     res.status(404).send();
//   }
// });

module.exports = router;
