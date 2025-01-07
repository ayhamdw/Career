const Post = require("../models/posts");
const User = require("../models/user2");

const getAllPosts = async (req, res) => {
  try {
    const proficientArray = [];
    console.log(req.params.searchJob);
    const posts = await Post.find({
      title: { $regex: req.params.searchJob, $options: "i" },
    });

    const proficient = await User.find({
      career: { $regex: req.params.searchJob, $options: "i" },
    }).select("career dayRate city profile");

    for (const element of proficient) {
      let proficient = {
        title: element.career,
        price: element.dayRate,
        location: element.city,
        id: element._id,
      };
      proficientArray.push(proficient);
    }

    const result = {
      posts,
      proficient: proficientArray,
    };

    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

module.exports = { getAllPosts };
