const User = require("../models/user"); //! User Model Object
const securePassword = require("../utils/securePassword");
const { sendResetCode } = require("../emails/account");

const oldPasswordChecker = async (req, res) => {
  console.log("inside old password checker");

  if (!req.user || !req.user.email) {
    console.log("User not authenticated");
    return res.status(401).send("User not authenticated");
  }

  console.log("User email:", req.user.email);
  console.log("Old Password:", req.query.oldPassword);

  try {
    const user = await User.findByCredentials(
      req.user.email,
      req.query.oldPassword
    );
    console.log("User authenticated successfully");
    res.send("true");
  } catch (error) {
    res.status(400).send("false");
    console.log("Inside error:", error);
  }
};
const forgotPasswordController = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username }).lean();
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const email = user.email.toString();
      const code = Math.floor(100000 + Math.random() * 900000);
      await User.updateOne(
        { username: username },
        { resetCode: code, resetCodeExpires: Date.now() + 7 * 60 * 1000 }
      );
      sendResetCode(email, code);
      res.status(200).send("Code sent successfully");
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
};

const resetPasswordController = async (req, res) => {
  const { username, code, password } = req.body.data;
  try {
    const user = await User.findOne({ username: username }).lean();
    const correctCode = user.resetCode;
    const expireDate = user.resetCodeExpires;
    if (code.toString() === correctCode.toString()) {
      if (new Date() > expireDate) {
        console.log("Expire Date");
        return res.status(403).send({ message: "The Code has been expired" });
      } else {
        const hashedPassword = securePassword(password);
        await User.updateOne(
          { username: username },
          { password: (await hashedPassword).toString() }
        );
        console.log("Changed Successfully");
        return res
          .status(200)
          .send({ message: "The Password Changed Successfully" });
      }
    } else {
      console.log("Incorrect Code");
      return res.status(403).send({ message: "Incorrect Code" });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = {
  oldPasswordChecker,
  forgotPasswordController,
  resetPasswordController,
};
