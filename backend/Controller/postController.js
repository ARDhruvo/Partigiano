import mongoose from "mongoose";
import { useParams } from "react-router-dom";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../Model/user.js"; 

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/*const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String, required: true }, // Added username field
  text: { type: String, required: true },
  reported: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});*/

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    category: String,
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: { type: String, required: true },
        text: String,
        reported: { type: Boolean, default: false },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    reports: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Post = mongoose.model("Post", postSchema);

  const getCategoryFromAI = async (title, body) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Classify this blog post into one of these categories: Technology, Health, Emergency, Education.  
        ONLY return the exact category name from this list, nothing else. 

        Title: ${title}
        Content: ${body}`;


        const result = await model.generateContent(prompt);
        
        console.log("AI Response:", result.response.text()); 

        const aiResponse = result.response.text().trim();
        const validCategories = ["Technology", "Health", "Emergency", "Education"];
        return validCategories.find(cat => aiResponse.includes(cat)) || "Others";

    } catch (error) {
      //console.log("AI Error Response:", result.response.text()); 
        console.error("Error categorizing post:", error);
        return "Others"; // Default category if AI fails
    }
};

export const createPost = async (req, res) => {
    try {
      const { title, body, author, /*category*/ } = req.body;
      if (!title || !body ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const category = await getCategoryFromAI(title,body);

      const newPost = new Post({ title, body, author, category });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };

  export const createComment = async (req, res) => {
    const { email, text } = req.body;
    //console.log(text);

  if (!email || !text.trim()) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) return res.status(404).json({ message: "User not found" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    console.log(text);

    post.comments.push({
      userId: user._id,
      username: user.username, // Store username along with comment
      text,
      reported: false,
    });
    //console.log(post.comments);

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  };

  export const getAllPost = async (req, res) => {
    try {
      const posts = await Post.find().sort({ reports: -1 });
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

  export const getPostByCat = async (req, res) => {
    try {
        const {category} = req.params;
      const posts = await Post.find({ category: category }).sort({likes: -1});
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch category posts" });
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
  

  
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePostLike = async (req, res) => {
  const { email } = req.body;
 // console.log(email);

  if (!email) return res.status(400).json({ message: "User email required" });

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const post = await Post.findById(req.params.id);
    console.log(post);
    if (!post) return res.status(404).json({ message: "Post not found" });
    console.log("Hello");
    console.log(post.likedBy);
    const userIndex = post.likedBy.indexOf(user._id);
    console.log("hello");
    console.log(`${userIndex}`);

    if (userIndex === -1) {
      post.likes += 1;
      post.likedBy.push(user._id);
    } else {
      post.likes -= 1;
      post.likedBy.splice(userIndex, 1);
    }

    await post.save();
    res.json({ post, hasLiked: userIndex === -1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};
  
  

