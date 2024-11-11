const {
  signupValidation,
  loginValidation,
} = require("../utils/validations/validation"); //! Validation Functions
const User = require("../models/user"); //! User Model Object
const { sendWelcomeEmail } = require("../emails/account");

const signupController = async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);

  try {
    await user.save();
    // sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const signinController = async (req, res, next) => {
  console.log("Inside Login");
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body.email, req.body.password);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    sendWelcomeEmail(user.email, user.firstName);
    res.send({ user, token });
  } catch (error) {
    console.log("Error", error);
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
const checkUserNameController = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(200).send({ message: "Username is available" });
    } else {
      res.status(400).send({ message: "Username is not available" });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = {
  signupController,
  signinController,
  logoutController,
  logoutAllController,
  checkUserNameController,
};
