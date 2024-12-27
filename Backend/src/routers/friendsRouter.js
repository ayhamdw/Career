const express = require("express");
const Auth = require("../middleware/auth");
const {
  sendFiendRequestController,
  getFriendsRequest,
  acceptFriendRequestController,
  acceptedFriendsController,
  logInUsers,
  deleteFriendFromList,
  getSendRequests,
} = require("../controllers/friendsController");
const router = new express.Router();
router.get("/logInUsers/:userId", Auth, logInUsers);

router.post("/send-friend-request", Auth, sendFiendRequestController);

router.get("/getFriendsRequest/:userId", Auth, getFriendsRequest);

router.post("/acceptFriendRequest", Auth, acceptFriendRequestController);
router.post("/deleteFriendFromList", Auth, deleteFriendFromList);
router.get("/request-sent/:userId", Auth, getSendRequests);
router.get("/acceptedFriends/:userId", Auth, acceptedFriendsController);

module.exports = router;
