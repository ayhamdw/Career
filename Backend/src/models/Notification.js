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
    type: {
      type: String,
      enum: ["Project Request", "Proficient Request"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", schema);
module.exports = Notification;
