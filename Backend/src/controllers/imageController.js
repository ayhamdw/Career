const path = require("path");
const multer = require("multer");
const User = require("../models/user2"); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.body.userId;

    const imageUrl = `http://localhost:7777/assets/images/${req.file.filename}`;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.profileImage = imageUrl;
    await user.save();

    return res.status(200).json({ message: "Image uploaded successfully", imageUrl: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { upload, uploadImage };
