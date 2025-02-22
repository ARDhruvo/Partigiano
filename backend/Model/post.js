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
  export default Post;