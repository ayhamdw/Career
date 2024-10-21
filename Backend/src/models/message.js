const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messageType: {
    type: String,
    required: true,
    enum: ["text", "image"],
  },
  message: String,
  messageUrl: String,
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
