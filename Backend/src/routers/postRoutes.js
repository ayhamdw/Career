const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

router.post("/post", auth, postController.createPost);
router.get("/posts", postController.getAllPosts);
router.delete(
  "/deletePost/:id",
  (req, res, next) => {
    console.log("Delete route hit with ID:", req.params.id);
    next();
  },
  postController.deletePost
);

router.post("/applyForProject", postController.applyForProject);

router.post("/savePost", postController.savePost);

router.get("/getSavedPosts/:id", postController.getSavedPosts);

router.get("/getSavedPostsIds/:userId", postController.getSavedPostsIds);

router.get("/myPosts/:id", postController.getMyPosts);

router.get("/getPostById/:id", postController.getPostById);

router.get("/getMyPostsWithDetails/:id", postController.getMyPostsWithDetails);

router.get("/getPostDetails/:id", postController.getPostDetails);

router.put("/updatePost/:id", postController.updatePost);

router.get("/getPostByPostId/:id", postController.getPostByPostId);

router.get("/getGroupChatUsers/:id", postController.getGroupChatUsers);

router.delete(
  "/deleteGroupChatUser/:postId/:userId",
  postController.deleteGroupChatUser
);

router.put("/updateGroupName/:id", postController.updateGroupName);

module.exports = router;
