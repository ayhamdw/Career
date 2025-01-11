const User = require("../models/user2"); //! User Model Object
const Message = require("../models/message"); //! Message Model Object
const Post = require("../models/posts"); //! Post Model Object

const messageController = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { senderId, receiverId, postId, messageType, messageText } = req.body;
    if (
      !senderId ||
      (!receiverId && !postId) ||
      !messageType ||
      (!messageText && messageType === "text") ||
      (messageType === "image" && !req.file)
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const messageData = {
      senderId,
      messageType,
      messageText: messageType === "text" ? messageText : null,
      messageUrl: messageType === "image" ? req.file.path : null,
      timestamp: new Date(),
    };

    if (postId) {
      messageData.postId = postId;
    } else {
      messageData.receiverId = receiverId;
    }

    const message = new Message(messageData);

    await message.save();

    const populatedMessage = await Message.findById(message._id).populate(
      "senderId",
      "_id profile.firstName profile.lastName profile.profileImage"
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
const getMessageBetweenUsersUsingPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const postOwner = await Post.findById(postId).select("user").lean();
    const message = await Message.find({ postId: postId }).populate(
      "senderId",
      "_id profile.firstName profile.lastName profile.profileImage"
    );
    const response = {
      message,
      postOwner,
    };
    res.status(200).send(response);
  } catch (error) {
    console.log("error while getting the messages", error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  messageController,
  getChatUserDetails,
  getMessageBetweenUsersController,
  getMessageBetweenUsersUsingPostId,
};
