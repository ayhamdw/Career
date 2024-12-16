const Post = require("../models/posts");
const User = require("../models/user2");

const createPost = async (req, res) => {
  const { title, content, careerCategory, location,numberOfWorker,userFirstName,userLastName } = req.body;
  const user = req.user; 
  const userRole = user.role; 
  try {
    const newPost = new Post({
      user: user._id, 
      userRole: userRole, 
      userFirstName,
      userLastName,
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

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id; 
    const userId = req.userId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    // if (post.user !== userId) {
    //   return res.status(403).json({ message: 'You are not authorized to delete this post.' });
    // }
    await Post.findByIdAndDelete(postId);
    return res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


module.exports = {
  createPost,
  getAllPosts,
  deletePost,
};

