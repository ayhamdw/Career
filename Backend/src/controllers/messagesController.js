const User = require("../models/user2"); //! User Model Object
const Message = require("../models/message"); //! Message Model Object

const messageController = async (req, res) => {
  try {
    const { senderId, receiverId, messageType, messageText } = req.body;

    if (
      !senderId ||
      !receiverId ||
      !messageType ||
      (!messageText && messageType === "text") ||
      (messageType === "image" && !req.file)
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const message = new Message({
      senderId,
      receiverId,
      messageType,
      messageText: messageType === "text" ? messageText : null,
      messageUrl: messageType === "image" ? req.file.path : null,
      timestamp: new Date(),
    });

    await message.save();

    const populatedMessage = await Message.findById(message._id).populate(
      "senderId",
      "_id profile.firstName profile.lastName"
    );

    res.status(200).json(populatedMessage);
  } catch (error) {
    console.error("Error while saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
};

const getChatUserDetails = async (req, res) => {
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

module.exports = {
  messageController,
  getChatUserDetails,
  getMessageBetweenUsersController,
};
