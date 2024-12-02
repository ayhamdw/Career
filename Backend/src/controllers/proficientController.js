const User = require("../models/user2");

const getProficientData = async (req, res) => {
  try {
    const { id, careerCategory } = req.query;
    console.log(careerCategory);
    if (careerCategory === "All Proficient") {
      await User.find({ _id: { $ne: id } })
        .select("profile email city career careerCategory")
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(500).send("Error: " + error));
    } else {
      await User.find({ _id: { $ne: id }, careerCategory: careerCategory })
        .select("profile email city career careerCategory")
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(500).send("Error: " + error));
    }
  } catch (error) {
    console.log(error);
  }
};

const getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const reviews = await Promise.all(
      user.profile.ratings.map(async (rating) => {
        const reviewer = await User.findById(rating.userId).select(
          "profile.firstName profile.lastName profile.profileImage"
        );
        return {
          rating: rating.rating,
          review: rating.review,
          date: rating.date,
          reviewer: reviewer || null,
        };
      })
    );

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProficientData, getReviews };
