import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    category: String,
    likes: { type: Number, default: 0 },
    reports: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Post = mongoose.model("Post", postSchema);

export const createPost = async (req, res) => {
    try {
      const { title, body, author, category } = req.body;
      if (!title || !body || !author || !category) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newPost = new Post({ title, body, author, category });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };

  export const getAllPost = async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };

  export const getPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };

  export const deletePost = async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json({ message: "Post deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
  