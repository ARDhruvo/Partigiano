import { useState, useEffect } from "react";
import React from "react";
import Header from "../components/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import "./Login.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const user = await axios.get(`http://localhost:4000/info/${email}`);
      const response = await axios.post("http://localhost:4000/posts", {
        title,
        body: content,
        author: user?.data.username,
      });
      toast.success("Post Created Successfully");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Create a New Post</h2>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "600px", margin: "auto", textAlign: "left" }}
        >
          <label style={{ display: "block", marginBottom: "10px" }}>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "90%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "1rem",
                fontSize: "1rem",
              }}
              placeholder="Enter your post title..."
            />
          </label>

          <label style={{ display: "block", marginBottom: "10px" }}>
            Write Your Blog:
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Share your thoughts..."
              style={{ marginBottom: "1rem" }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{ padding: "10px 20px" }}
          >
            {loading ? "Posting" : "Post"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
