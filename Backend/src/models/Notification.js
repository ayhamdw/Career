const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },

    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    rated: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Unread", "Read"],
      default: "Unread",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", schema);
module.exports = Notification;
