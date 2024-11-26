const User = require("../models/user2"); //! User Model Object
const Message = require("../models/message"); //! Message Model Object
const messageController = async (req, res) => {
  try {
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
    console.error("Error while saving message:", error);
    res.status(500).json({ error: error.message });
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
