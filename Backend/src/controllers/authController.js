const {
  signupValidation,
  loginValidation,
} = require("../utils/validations/validation"); //! Validation Functions
const User = require("../models/user2"); //! User Model Object
const { sendWelcomeEmail } = require("../emails/account");

const signupController = async (req, res) => {
  try {
    const { isOAuth, email, firstName, lastName, profileImage } = req.body;

    let user;
    if (isOAuth) {
      user = await User.findOne({ email });
      if (!user) {
        user = new User({
          email,
          profile: {
            firstName,
            lastName,
            profileImage,
          },
        });
        await user.save();
      }
    } else {
      user = new User(req.body);
      await user.save();
    }

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
    res.status(200).send({
      user,
      token,
      verificationStatus: user.verificationStatus,
    });
  } catch (error) {
    console.log("Error inside the Login", error);
    // next(error);
    res.status(404).send({ error: "Invalid email or password" });
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
    console.log("Error inside the Verify Code", error);
  }
};

const signinWithGoogle = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    const token = await user.generateAuthToken();

    res.status(200).send({
      user,
      token,
      verificationStatus: user.verificationStatus,
    });
  } catch (error) {
    console.log("Error inside the Login", error);
    next(error);
  }
};

const signupWithGoogle = async (req, res) => {
  try {
    const { isOAuth, email, firstName, lastName, profileImage } = req.body;

    let user;
    let username = email.split("@")[0];
    if (!username) {
      username = `user${Date.now()}`;
    }

    if (isOAuth) {
      user = await User.findOne({ email });
      if (!user) {
        user = new User({
          email,
          username,
          profile: {
            firstName,
            lastName,
            profileImage,
          },
          verificationStatus: true,
        });
        await user.save();
      }
    } else {
      user = new User(req.body);
      await user.save();
    }

    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    console.log("Error inside the Signup", error);
    res.status(400).send(error);
  }
};

const validateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ exists: true, message: "Email exists." });
    } else {
      return res
        .status(404)
        .json({ exists: false, message: "Email not found." });
    }
  } catch (err) {
    console.error("Error validating email:", err);
    res.status(500).json({ message: "Internal server error." });
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
  validateEmail,
  signinWithGoogle,
  signupWithGoogle,
};
