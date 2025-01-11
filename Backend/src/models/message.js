const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: false,
  },
  messageType: {
    type: String,
    required: true,
    enum: ["text", "image"],
  },
  messageText: String,
  messageUrl: String,
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.pre("save", function (next) {
  if (!this.receiverId && !this.postId) {
    return next(new Error("Either receiverId or postId must be provided."));
  }
  if (this.receiverId && this.postId) {
    return next(new Error("You cannot have both receiverId and postId."));
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
