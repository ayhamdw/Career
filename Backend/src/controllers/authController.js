const {
  signupValidation,
  loginValidation,
} = require("../utils/validations/validation"); //! Validation Functions
const User = require("../models/user2"); //! User Model Object
const { sendWelcomeEmail } = require("../emails/account");
const signupController = async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send("Error" + error.details[0].message);
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log("Error inside the Signup", error);
    res.status(400).send(error);
  }
};

const signinController = async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    // await User.generateFakeData();
    sendWelcomeEmail(user.email, user.profile.firstName);
    res.send({ user, token });
  } catch (error) {
    console.log("Error inside the Login");
    next(error);
  }
};

const logoutController = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send({ message: "successfully logged out" });
  } catch (error) {
    res.status(500).send();
  }
};

const logoutAllController = async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send({ message: "successfully logged out all sessions" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllEmails = async (req, res) => {
  try {
    const users = await User.find({}, "email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const getAllUsernames = async (req, res) => {
  try {
    const users = await User.find({}, "username");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  signupController,
  signinController,
  logoutController,
  logoutAllController,
  getAllEmails,
  getAllUsernames,
};
