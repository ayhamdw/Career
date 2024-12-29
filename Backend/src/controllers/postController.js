const Post = require("../models/posts");
const User = require("../models/user2");

const createPost = async (req, res) => {
  const { title, content, careerCategory, location, numberOfWorker, photos } =
    req.body;
  const user = req.user;
  const userRole = user.role;
  console.log(req.body);
  console.log(user);
  console.log(userRole);
  try {
    const newPost = new Post({
      user: user._id,
      userRole: userRole,
      title,
      content,
      careerCategory,
      location,
      numberOfWorker,
      images: photos || [],
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
      .populate("user", "_id username profile email role city")
      .lean();
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

const applyForProject = async (req, res) => {
  const { postId, receiverId, senderId } = req.body;
  try {
    await User.findByIdAndUpdate(senderId, {
      $push: { sendProjectRequests: { projectId: postId, userId: receiverId } },
    });
    await User.findByIdAndUpdate(receiverId, {
      $push: {
        receiveProjectRequests: { projectId: postId, userId: senderId },
      },
    });

    res.status(200).json({ message: "Applied for project successfully" });
  } catch (error) {
    console.log("error while applying for project", error);
  }
};
const savePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const response = await User.findOne({
      _id: userId,
      savedPosts: postId,
    }).lean();
    if (response) {
      await User.findByIdAndUpdate(userId, {
        $pull: { savedPosts: postId },
      });
      console.log("Post unsaved successfully");
      return res.status(200).json({ message: "Post unsaved successfully" });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { savedPosts: postId },
      });
      console.log("Post saved successfully");
      return res.status(200).json({ message: "Post saved successfully" });
    }
  } catch (error) {
    console.log("error while saving post", error);
  }
};

const getSavedPostsIds = async (req, res) => {
  try {
    console.log(req.params.userId);
    const userId = req.params.userId;
    await User.findById(userId)
      .select("savedPosts")
      .lean()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        console.log("error while getting saved posts", error);
        res.status(400).send({ error: "Error fetching saved posts" });
      });
  } catch (error) {
    console.log("error while getting saved posts", error);
  }
};

const getSavedPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await User.findById(userId)
      .populate({
        path: "savedPosts",
        select:
          "user title content careerCategory location numberOfWorker postDate images",
      })
      .lean();
    res.status(200).send(response);
  } catch (error) {
    console.log("error while getting saved posts", error);
  }
};

const getAllPostsExceptMine = async (req, res) => {
  try {
    const posts = await Post.find({ user: { $ne: req.user._id } })
      .populate("user", "_id username profile email role city")
      .lean();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ error: "Error fetching posts" });
  }
};

const getMyPosts = async (req, res) => {
  console.log("id", req.params.id);
  const posts = await Post.find({ user: req.params.id }).select("_id").lean();
  res.status(200).send(posts);
  console.log(posts);
};

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
  applyForProject,
  savePost,
  getSavedPosts,
  getSavedPostsIds,
  getMyPosts,
};
