import React, { useState ,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import Contents from "./contents";
import "./blog.css";
import axios from "axios";

function adminBlogBody() {
  const { id } = useParams();
    const navigate = useNavigate();

  const [contents, setContents] = useState();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]); 
  const [reportedPosts, setReportedPosts] = useState([]);
  
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
        const response = await axios.get(`http://localhost:4000/info/${storedEmail}`);
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

    if(!userId) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/posts/category/${id}`);
        setContents(response.data);
        setLikedPosts((prev) => {
          if (response.data.likedBy.includes(userId)) {
            return [...prev, id]; // Add post ID if liked
          }
          return prev.filter((postId) => postId !== id); // Remove if unliked
        });

        setReportedPosts((prev) => {
          if (response.data.reportedBy.includes(userId)) {
            return [...prev, id]; 
          }
          return prev.filter((postId) => postId !== id);
        });


      } catch (err) {
        console.error("Error Fetching Post:",err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id,userId]);


  const handleLike = async () => {
    try {
      const response = await axios.patch(`http://localhost:4000/posts/${id}/like`, { email: userEmail });

      setContents(response.data.post);
      setLikedPosts((prev) => {
        if (response.data.hasLiked) {
          return [...prev, id]; // Add liked post ID
        } else {
          return prev.filter((postId) => postId !== id); // Remove unliked post ID
        }
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleReport = async () => {
    try {
      const response = await axios.patch(`http://localhost:4000/posts/${id}/report`, { userId });

      setContents(response.data);
      setReportedPosts((prev) => {
        if (response.data.reportedBy.includes(userId)) {
          return [...prev, id];
        } else {
          return prev.filter((postId) => postId !== id);
        }
      });
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };


  if(loading) return <p>Loading......</p>;
  if(!contents) return <p>Post not found!</p>;

  const isLiked = likedPosts.includes(id);
  const isReported = reportedPosts.includes(id);

  return (
    <div className="homeTitle">
      <div key={contents.id} className="post-container">
          <Contents contents={contents} />
          <div className="button-container" style={{ marginLeft: "40px" }}>
              <button
                className="like-button"
                onClick={handleLike}
              >
                {isLiked ? "👎 Dislike" : "👍 Like"} ({contents.likes})
              </button>
              <button
              className="report-button"
              onClick={handleReport}
              style={{ marginLeft: "10px", backgroundColor: isReported ? "red" : "gray" }}
              >
                {isReported ? "🚩 Reported" : "⚠️ Report"} ({contents.reports})
              </button>

            </div>
          </div>
    </div>
  );
}

export default adminBlogBody;
