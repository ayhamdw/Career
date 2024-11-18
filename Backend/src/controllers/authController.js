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
    console.log("test");
    // sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const signinController = async (req, res, next) => {
  console.log("Inside Login");
  console.log(req.body.email, req.body.password);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(user.profile.firstName);
    const token = await user.generateAuthToken();
    console.log(token);
    sendWelcomeEmail(user.email, user.firstName);
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

module.exports = {
  signupController,
  signinController,
  logoutController,
  logoutAllController,
};
