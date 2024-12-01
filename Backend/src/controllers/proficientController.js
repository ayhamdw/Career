const User = require("../models/user2");

const getProficientData = async (req, res) => {
  try {
    const id = req.params.userId;
    const users = User.find({ _id: { $ne: id } })
      .select("profile email city career careerCategory")
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(500).send("Error: " + error));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getProficientData };
