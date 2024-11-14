const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customError = require("../middleware/error/customError");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password mustn't contain password");
        }
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    profile: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
      bio: { type: String, trim: true },
      experience: { type: String, trim: true },
      profileImage: { type: String, trim: true },
      ratings: [
        {
          rating: { type: Number, required: true },
          review: { type: String, trim: true },
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          date: { type: Date, default: Date.now },
        },
      ],
    },
    verificationStatus: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    resetCode: {
      type: Number,
    },
    resetCodeExpires: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);
const User = mongoose.model("User", "userSchema");
module.exports = User;
