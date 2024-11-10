const {
  signupValidation,
  loginValidation,
} = require("../utils/validations/validation"); //! Validation Functions
const User = require("../models/user"); //! User Model Object
const Message = require("../models/message"); //! Message Model Object
const {
  sendWelcomeEmail,
  sendCancellationEmail,
  sendCode,
} = require("../emails/account");

const securePassword = require("../utils/securePassword");

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
    sendWelcomeEmail(user.email, user.firstName);
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
    const { senderId, receiverId } = JSON.parse(req.body.ids);
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    sender.friends.push(receiverId);
    receiver.friends.push(senderId);
    console.log("test");

    sender.sendRequests = sender.sendRequests.filter(
      (request) => request.toString() !== receiverId.toString()
    );

    receiver.friendRequests = receiver.friendRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: "Friend Request Accepted" });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

const acceptedFriendsController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId)
      .populate("friends", "firstName lastName email image")
      .lean();
    const friends = user.friends;
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};
const messageController = async (req, res) => {
  try {
    console.log("inside message controller");
    console.log(req.body);
    const { senderId, receiverId, messageType, messageText } = req.body;

    if (messageType === "image" && !req.file) {
      console.error("File upload failed: req.file is undefined");
      return res.status(400).json({ error: "File upload failed" });
    }

    if (
      !senderId ||
      !receiverId ||
      !messageType ||
      (!messageText && messageType !== "image")
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const message = new Message({
      senderId,
      receiverId,
      messageType,
      messageText: messageType === "text" ? messageText : null,
      timestamp: new Date(),
      messageUrl: messageType === "image" ? req.file.path : null,
    });

    await message.save();
    console.log("Message saved successfully");
    res.status(200).json({ message: "Message Sent Successfully" });
  } catch (error) {
    console.error("Error while saving message:", error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};

const getChatUserDetails = async (req, res) => {
  // console.log("inside get chat user details");
  try {
    const userId = req.params.userId;
    await User.findById(userId)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        console.log("error while finding user", error);
        res.status(500).json({ Error: error });
      });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

const getMessageBetweenUsersController = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const message = await Message.find({
      $or: [
        { senderId: receiverId, receiverId: senderId },
        { senderId: senderId, receiverId: receiverId },
      ],
    }).populate("senderId", "_id name");
    res.status(200).json(message);
  } catch (error) {
    console.log("error while getting the messages", error);
    res.status(500).json({ error: error });
  }
};

const forgotPasswordController = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username }).lean();
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const email = user.email.toString();
      const code = Math.floor(100000 + Math.random() * 900000);
      await User.updateOne(
        { username: username },
        { resetCode: code, resetCodeExpires: Date.now() + 15 * 60 * 1000 }
      );
      sendCode(email, code);
      res.status(200).send("Code sent successfully");
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
};

const resetPasswordController = async (req, res) => {
  const { username, code, password } = req.body.data;
  try {
    const user = await User.findOne({ username: username }).lean();
    const correctCode = user.resetCode;
    const expireDate = user.resetCodeExpires;
    if (code !== correctCode) {
      if (new Date() > expireDate) {
        console.log("Expire Date");
        return res.status(403).send({ message: "The Code has been expired" });
      } else {
        const hashedPassword = securePassword(password);
        await User.updateOne(
          { username: username },
          { password: (await hashedPassword).toString() }
        );
        console.log("Changed Successfully");
        return res
          .status(200)
          .send({ message: "The Password Changed Successfully" });
      }
    } else {
      console.log("Incorrect Code");
      return res.status(403).send({ message: "Incorrect Code" });
    }
  } catch (error) {
    console.log("Error", error);
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
  acceptedFriendsController,
  messageController,
  getChatUserDetails,
  getMessageBetweenUsersController,
  forgotPasswordController,
  resetPasswordController,
};
