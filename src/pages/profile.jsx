import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Contents from "../components/blogContents";

function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const userResponse = await axios.get("http://localhost:4000/user/profile");
        const postsResponse = await axios.get("http://localhost:4000/posts/profile");
        setUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setImageLoading(true);
      const response = await axios.post("http://localhost:4000/user/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser((prevUser) => ({
        ...prevUser,
        avatar: response.data.avatarUrl,
      }));
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setImageLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <div style={{ textAlign: "center" }}>
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          style={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
        <h2>{user.name}</h2>
        <p>@{user.username}</p>
        <p>{user.bio}</p>

        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: "10px" }} />
        {imageLoading && <p>Uploading...</p>}
      </div>

      <div className="home-content">
        <h3>My Blogs</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-container">
              <Contents contents={post} />
              <div className="button-container" style={{ marginLeft: "40px" }}>
                <button className="like-button">Like ({post.likes})</button>
                <button className="report-button" style={{ marginLeft: "10px" }}>Report</button>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs posted yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
