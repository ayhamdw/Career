const User = require("../models/user");
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
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).send({ message: "Available email" });
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
