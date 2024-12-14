const Post = require("../models/posts");
const User = require("../models/user2");

const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const post = new Post({
      user: user._id,
      title: req.body.title,
      content: req.body.content,
      careerCategory: req.body.careerCategory,
      location: req.body.location,
    });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).send({ error: "Error creating post" });
  }
};

module.exports = {
  createPost,
};
