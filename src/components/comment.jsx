import React from 'react'
import { useState } from 'react';

const CommentBox = () => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
  
    const handleAddComment = () => {
      if (comment.trim()) {
        setComments([...comments, comment]);
        setComment("");
      }
    };
  
    return (
      <div className="comment-box-container">
        
        <textarea
          className="comment-box-textarea"
          rows="4"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="comment-box-button" onClick={handleAddComment}>
          Add Comment
        </button>
  
        <div className="comment-box-comments">
          <h3 className="comment-box-subtitle">Comments:</h3>
          {comments.length > 0 ? (
            <ul className="comment-box-list">
              {comments.map((comment, index) => (
                <li key={index} className="comment-box-item">
                  {comment}
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