import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CommentBox = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    if (!storedEmail) {
      navigate("/login");
      return;
    }
    setUserEmail(storedEmail);

    // Fetch comments for this post
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts/category/${id}`);
        console.log(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id, navigate]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(`http://localhost:4000/posts/${id}/comment`, {
        email: userEmail,
        text: commentText,
      });

      setComments(response.data.comments);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReportComment = async (commentId) => {
    try {
      const response = await axios.patch(`http://localhost:4000/posts/${postId}/comment/${commentId}/report`);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error reporting comment:", error);
    }
  };

  return (
    <div className="comment-box-container">
      <textarea
        className="comment-box-textarea"
        rows="4"
        placeholder="Write your comment here..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      ></textarea>
      <button className="comment-box-button" onClick={handleAddComment}>
        Add Comment
      </button>

      <div className="comment-box-comments">
        <h3 className="comment-box-subtitle">Comments:</h3>
        {comments?.length > 0 ? (
          <ul className="comment-box-list">
            {comments.map((comment) => (
              <li key={comment._id} className="comment-box-item">
                <span>{comment.text}</span>
                {comment.reported ? (
                  <span className="reported-label"> (Reported)</span>
                ) : (
                  <span
                    className="report-text"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleReportComment(comment._id)}
                  >
                    Report
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="comment-box-no-comments">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
