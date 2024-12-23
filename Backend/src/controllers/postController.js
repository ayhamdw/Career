const Post = require("../models/posts");
const User = require("../models/user2");

const createPost = async (req, res) => {
<<<<<<< HEAD
  const { title, content, careerCategory, location,numberOfWorker} = req.body;
  const user = req.user; 
  const userRole = user.role; 
  try {
    const newPost = new Post({
      user: user._id, 
      userRole: userRole, 
=======
>>>>>>> e3f5cce8ebe887782e8d8c24c8b17277853656f7
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
    const posts = await Post.find()
      .populate("user", "username profile email role city")
      .exec();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ error: "Error fetching posts" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    await Post.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
};
