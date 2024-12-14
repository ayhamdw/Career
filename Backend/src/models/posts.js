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
      required: true,
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
    postDate: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
          trim: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",  
          required: true,
        },
        commentDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, 
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
