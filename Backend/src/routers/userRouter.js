const express = require("express");

const router = new express.Router();
const {
  updateUserProfile,
  getUserDetails,
  rateUser,
  checkIfUserRated,
  saveExpoToken,
  getAllUserCoordinates,
  bandUser,
  getBanUntil
} = require("../controllers/userController");
const Auth = require("../middleware/auth");

router.get("/me/:userId", Auth, getUserDetails);
router.put("/update/profile", Auth, updateUserProfile);
router.post("/rateUser", rateUser);
router.post("/userRated", checkIfUserRated);
router.post("/save-expo-token", saveExpoToken);
router.post("/ban-user/:userId", bandUser);
router.get("/banUntil/:userId", getBanUntil);

router.get("/coordinations", getAllUserCoordinates);

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
