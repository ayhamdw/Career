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

module.exports = router;
