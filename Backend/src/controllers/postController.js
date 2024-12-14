const Post = require("../models/posts");
const User = require("../models/user2");

const createPost = async (req, res) => {
  const { title, content, careerCategory, location,numberOfWorker } = req.body;
  const user = req.user; 
  const userRole = user.role; 
  try {
    const newPost = new Post({
      user: user._id, 
      userRole: userRole, 
      title,
      content,
      careerCategory,
      location,
      numberOfWorker,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post" });
  }
};


const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username firstName lastName");
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ error: "Error fetching posts" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};

