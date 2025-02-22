import React, { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import Contents from "./contents";
import "./blog.css";
import axios from "axios";

function BlogBody() {
  const { id } = useParams();
  const [contents, setContents] = useState();
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/posts/category/${id}`);
        setContents(response.data);
      } catch (err) {
        console.error("Error Fetching Post:",err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);


  const handleLike = async () => {
    if (!contents) return;

    try {
      // Optionally, update the backend
      //await axiosInstance.patch(`/posts/${id}/like`);

      // Optimistic update
      setContents((prevContent) => ({
        ...prevContent,
        likes: prevContent.likes + 1,
      }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  if(loading) return <p>Loading......</p>;
  if(!contents) return <p>Post not found!</p>;

  return (
    <div className="homeTitle">
      <div key={contents.id} className="post-container">
          <Contents contents={contents} />
          <div className="button-container" style={{ marginLeft: "40px" }}>
              <button
                className="like-button"
                onClick={handleLike}
              >
                Like ({contents.likes})
              </button>
              <button className="report-button" style={{ marginLeft: "10px" }}>
                Report
              </button>
            </div>
          </div>
    </div>
  );
}

export default BlogBody;
