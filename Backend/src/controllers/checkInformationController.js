const User = require("../models/user2");
const { sendVerificationCode } = require("../emails/account");
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

const checkEmailController = async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 90000);
  sendVerificationCode(email, code);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      sendVerificationCode(email, code);
      return res.status(200).json({ code: code });
    } else {
      return res.status(400).send({ message: "Unavailable email" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  checkUserNameController,
  checkEmailController,
};
