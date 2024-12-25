const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    // projectId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Project",
    //   required: false,
    //   trim: true,
    //   default: null,
    // },
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
