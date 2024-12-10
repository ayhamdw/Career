const {
  signupValidation,
  loginValidation,
} = require("../utils/validations/validation"); //! Validation Functions
const User = require("../models/user2"); //! User Model Object
const { sendWelcomeEmail } = require("../emails/account");

const signupController = async (req, res) => {
  // const { error } = signupValidation(req.body);
  // if (error) return res.status(400).send("Error" + error.details[0].message);
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
    // sendWelcomeEmail(user.email, user.profile.firstName);
    res.send({
      user,
      token,
      verificationStatus: user.verificationStatus,
    });
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

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    user.verificationStatus = true;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Verification successful" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};

module.exports = {
  signupController,
  signinController,
  logoutController,
  logoutAllController,
  getAllEmails,
  getAllUsernames,
  verifyCode,
};
