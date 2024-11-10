const User = require("../models/user"); //! User Model Object

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
