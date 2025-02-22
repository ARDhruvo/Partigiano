import { useState } from 'react';
import React from 'react';
import Header from '../components/header';
//import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content || !category) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/posts", {
        title,
        body: content,
        category,
        author: "NRK"//user?.username, // Assign the logged-in user as the author
      });
      const {data} = response;
      toast.success("Post Created Successfully");

      setTimeout(()=>{
        navigate("/");
      },1000);

    } catch (err) {
      console.error("Error creating post:", err);
    }finally{
      setLoading(false)
    }

    console.log("Post Submitted:", { title, category, content });
  };

  const textAreaStyle = {
    width: "90%",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "1rem",
    resize: "none",
    fontSize: "1rem",
    display: "block"
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto", textAlign: "left" }}>
          
          <label style={{ display: "block", marginBottom: "10px" }}>
            Title:
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              style={textAreaStyle} 
              placeholder="Enter your post title..."
            />
          </label>

          <label style={{ display: "block", marginBottom: "10px" }}>
            Select Category:
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              style={textAreaStyle}>
              <option value="">-- Choose a category --</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
            </select>
          </label>

          <label style={{ display: "block", marginBottom: "10px" }}>
            Write Your Blog:
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              rows="6" 
              style={textAreaStyle} 
              placeholder="Share your thoughts..."
            />
          </label>
          
          <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
            {loading ? "Posting" : "Post"}
            </button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
