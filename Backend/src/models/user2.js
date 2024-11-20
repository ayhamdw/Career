const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customError = require("../middleware/error/customError");
require("dotenv").config();
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
      default: "user",
    },
    career: {
      type: String,
      required: false,
      trim: true,
    },
    careerCategory: {
      type: String,
      required: true,
      enum: ["Home Services", "Technical", "Education", "Healthcare", "Other"], // Define specific categories
      trim: true,
    },
    profile: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
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
      experience: { type: String, trim: true, default: "" },
      profileImage: { type: String, trim: true, default: "" },
      ratings: [
        {
          rating: { type: Number, required: true, default: 0 },
          review: { type: String, trim: true, default: "" },
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
          },
          date: { type: Date, default: Date.now, default: "" },
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
      default: 0,
    },
    resetCodeExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new customError("USER_NOT_FOUND");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new customError("INVALID_EMAIL_OR_PASSWORD");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
