"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Contents from "./contents";
import "./blog.css";
import axios from "axios";
import toast from "react-hot-toast";

function adminBlogBody() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contents, setContents] = useState();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("verificationEmail");
    if (!storedEmail) {
      navigate("/login");
      return;
    }
    setUserEmail(storedEmail);

    // Fetch user info by email
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/info/${storedEmail}`
        );
        setUserId(response.data._id);
        //console.log(userId);
      } catch (error) {
        console.error("Error fetching user info:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/posts/category/${id}`
        );
        setContents(response.data);
      } catch (err) {
        console.error("Error Fetching Post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, userId]);

  const handleDelete = async () => {
    try {
      // First fetch the post to get author and title
      const response = await axios.get(`http://localhost:4000/posts/category/${id}`);
      const data = await response.data;
      console.log(response.data);
      console.log(response.data.title);
      console.log(response.data.author);

      const postTitle = data.title;
      const authorUsername = data.author;

      // Get author's email using getUserByUsername
      const userResponse = await axios.get(
        `http://localhost:4000/info/user/${authorUsername}`
      );
      const authorEmail = userResponse.data.email;
      console.log(authorEmail);

      // Delete the post and pass email and title
      await axios.delete(`http://localhost:4000/posts/${id}`, {
        data: { email: authorEmail, title: postTitle },
      });

      toast.success("Post deleted successfully!");
      navigate("/admin"); // Redirect to admin dashboard after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const handleNotDelete = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/posts/${id}/reset-reports`
      );
      setContents(response.data); // Update UI with reset reports
      toast.success("Reports have been reset!");
      navigate("/admin");
    } catch (error) {
      console.error("Error resetting reports:", error);
    }
  };

  if (loading) return <p>Loading......</p>;
  if (!contents) return <p>Post not found!</p>;

  // const isLiked = likedPosts.includes(id);
  //const isReported = reportedPosts.includes(id);

  return (
    <div className="homeTitle">
      <div key={contents.id} className="post-container">
        <Contents contents={contents} />
        <div className="button-container" style={{ marginLeft: "40px" }}>
          <button className="like-button" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="report-button"
            onClick={handleNotDelete}
            style={{ marginLeft: "10px", backgroundColor: "gray" }}
          >
            Not Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default adminBlogBody;
