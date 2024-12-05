const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customError = require("../middleware/error/customError");
const { faker } = require("@faker-js/faker");
const { required } = require("joi");
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
      // enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "male", "female"],
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    career: {
      type: String,
      required: false,
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
      ], // Define specific categories
      trim: true,
    },
    profile: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
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
    verificationCode:{
      type: String,
      default:'',
      required: false,
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

userSchema.statics.generateFakeData = async () => {
  try {
    const fakeUsers = [];

    for (let i = 0; i < 10; i++) {
      const careerCategory = faker.helpers.arrayElement(careerCategories); // Randomly pick a career category

      fakeUsers.push({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "user",
        gender: faker.person.sexType(),
        city: faker.location.city(),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 60, mode: "age" }),
        career: faker.person.jobTitle(),
        careerCategory: careerCategory, // Use the randomly selected category
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
