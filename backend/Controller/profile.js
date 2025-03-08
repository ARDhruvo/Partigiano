const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "ddbqtafnn",
  api_key: "452946869674437",
  api_secret: "Bwuu_xjXvHhWAJnK_CaLMq1P_aE",
});

// Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get user profile
router.get("/profile", async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

// Upload avatar
router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await cloudinary.uploader.upload_stream(
      { folder: "profile_pictures" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Upload failed" });
        }

        // Update user avatar in the database
        const user = await User.findByIdAndUpdate(userId, { avatar: result.secure_url }, { new: true });

        res.json({ avatarUrl: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
});

module.exports = router;
