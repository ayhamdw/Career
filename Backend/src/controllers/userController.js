const {
  signupValidation,
  loginValidation,
} = require("../utils/validations/validation"); //! Validation Functions
const User = require("../models/user"); //! User Model Object
const { json } = require("express");
const signupController = async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);

  try {
    await user.save();
    // sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const signinController = async (req, res, next) => {
  console.log("Inside Login");
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body.email, req.body.password);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log("Error", error);
    next(error);
  }
};

const logoutController = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send({ message: "successfully logged out" });
  } catch (error) {
    res.status(500).send();
  }
};

const logoutAllController = async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send({ message: "successfully logged out all sessions" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const oldPasswordChecker = async (req, res) => {
  console.log("inside old password checker");

  if (!req.user || !req.user.email) {
    console.log("User not authenticated");
    return res.status(401).send("User not authenticated");
  }

  console.log("User email:", req.user.email);
  console.log("Old Password:", req.query.oldPassword);

  try {
    const user = await User.findByCredentials(
      req.user.email,
      req.query.oldPassword
    );
    console.log("User authenticated successfully");
    res.send("true");
  } catch (error) {
    res.status(400).send("false");
    console.log("Inside error:", error);
  }
};

const logInUsers = async (req, res) => {
  const loggedInUsers = req.params.userId;
  console.log(`id , ${loggedInUsers}`);
  //* Get All users Except Me (My Account)
  User.find({ _id: { $ne: loggedInUsers } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ Error: error });
    });
};

const sendFiendRequestController = async (req, res) => {
  const { currentUserId, selectedUserId } = JSON.parse(req.body.ids);
  try {
    await User.findByIdAndUpdate(selectedUserId, {
      $push: {
        friendRequests: currentUserId,
      },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: {
        sendRequests: selectedUserId,
      },
    });
  } catch (error) {
    console.log("error", error);
  }
};

const getFriendsRequest = async (req, res) => {
  const userId = req.params.userId;
  console.log("inside Get Friends Request", userId);
  try {
    const user = await User.findById(userId)
      .populate("friendRequests", "firstName lastName email image")
      .lean();
    const friendRequests = user.friendRequests;
    res.status(200).json(friendRequests);
  } catch (error) {
    console.log("error", error);
  }
};

const acceptFriendRequestController = async (req, res) => {
  try {
    const { senderId, receiverId } = json.parse(req.body.ids);
    console.log("senderId", senderId);
    console.log("receiverId", receiverId);
    console.log("inside Accept Friend Request");
    // const sender = User.findById(senderId);
    // const receiver = User.findById(receiverId);

    // sender.friends.push(receiverId);
    // receiver.friends.push(senderId);

    // sender.sendRequests = sender.sendRequests.filter(
    //   (request) => request !== receiverId
    // );

    // receiver.friendRequests = receiver.friendRequests.filter(
    //   (request) => request !== senderId
    // );

    // await sender.save();
    // await receiver.save();

    res.status(200).json({ message: "Friend Request Accepted" });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

module.exports = {
  signinController,
  signupController,
  logoutController,
  logoutAllController,
  oldPasswordChecker,
  logInUsers,
  sendFiendRequestController,
  getFriendsRequest,
  acceptFriendRequestController,
};
