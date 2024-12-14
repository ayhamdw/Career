const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth"); 

router.post("/post", auth, postController.createPost);
router.get("/posts", postController.getAllPosts);

module.exports = router;
