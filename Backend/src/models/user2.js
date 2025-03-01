const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customError = require("../middleware/error/customError");
const { faker } = require("@faker-js/faker");
const { required, string } = require("joi");
require("dotenv").config();
const careerCategories = [
  "Technical Services",
  "Home Services",
  "Educational Services",
  "Healthcare",
  "Creative Services",
  "Legal & Financial Services",
  "Other",
];

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: false,
      trim: true,
      default: "",
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
      default: "user",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "male", "female"],
    },
    city: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    career: {
      type: String,
      required: false,
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
      trim: true,
    },
    profile: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      phone: { type: Number, default: 0, trim: true },
      numberOfRequest: {
        type: Number,
        default: 0,
      },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: false,
        },
      },
      bio: { type: String, trim: true },
      experience: { type: String, trim: true, default: "" },
      profileImage: { type: String, trim: true, default: "" },
      ratings: [
        {
          rating: { type: Number, required: false, default: 0 },
          review: { type: String, trim: true, default: "" },
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
          },
        },
      ],
      certificates: {
        type: [String],
        required: false,
      },
      additionalImages: {
        type: [String],
        required: false,
      },
    },
    verificationStatus: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
      required: false,
    },
    rating: {
      type: [Number],
      default: [],
      required: false,
    },
    dayRate: {
      type: Number,
      default: 0,
    },
    certificate: {
      isCertified: {
        type: Boolean,
        default: false,
      },
      certificateFile: {
        type: String,
        default: "",
      },
      verificationStatus: {
        type: String,
        enum: ["pending", "verified", "rejected","noFile"],
        default: "noFile",

      },
    },
    bannedUntil: { type: Date, default: null , required: false},

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
    sendProficientRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    receiveProficientRequest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rejectedRequestSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rejectedRequestReceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    acceptedRequestsSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    acceptedRequestReceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    acceptedRequestCurrently: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    acceptedRequestFinished: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    expoPushToken: {
      type: String,
      default: "",
      required: false,
    },
    resetCode: {
      type: Number,
      default: 0,
      required: false,
    },
    resetCodeExpires: {
      type: Date,
      default: null,
      required: false,
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
  if (!user) {
    throw new customError("USER_NOT_FOUND");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new customError("INVALID_EMAIL_OR_PASSWORD");
  }

  return user;
};

userSchema.statics.findByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new customError("USER_NOT_FOUND");
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

userSchema.statics.generateFakeData = async () => {
  try {
    const fakeUsers = [];

    for (let i = 0; i < 10; i++) {
      const careerCategory = faker.helpers.arrayElement(careerCategories);

      fakeUsers.push({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "user",
        gender: faker.person.sexType(),
        city: faker.location.city(),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 60, mode: "age" }),
        career: faker.person.jobTitle(),
        careerCategory: careerCategory,
        profile: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          bio: faker.lorem.sentences(),
          experience: faker.lorem.paragraph(),
          phone: faker.phone.number("+### ### ### ###"),
          location: {
            type: "Point",
            coordinates: [
              parseFloat(faker.location.longitude()),
              parseFloat(faker.location.latitude()),
            ],
          },
        },
        verificationStatus: faker.datatype.boolean(),
        tokens: [],
        friendRequests: [],
        friends: [],
        sendRequests: [],
        resetCode: faker.number.int({ min: 1000, max: 9999 }),
        resetCodeExpires: faker.date.future(),
      });
    }

    await User.insertMany(fakeUsers);
    console.log("Fake data inserted successfully!");
  } catch (error) {
    console.error("Error inserting fake data:", error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
