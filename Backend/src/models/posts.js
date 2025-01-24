const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    careerCategory: {
      type: String,
      required: false,
      enum: [
        "Home Services",
        "Technical Services",
        "Educational Services",
        "Healthcare",
        "Creative Services",
        "Legal & Financial Services",
        "Other",
      ],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfWorker: {
      type: Number,
      required: true,
    },
    postDate: {
      type: Date,
      default: Date.now,
    },
    images: {
      type: [String],
      default: [],
      required: false,
    },
    dayRate: {
      type: Number,
      required: false,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groupName: {
      type: String,
      default: function () {
        return `Group: ${this.title}`;
      },
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
