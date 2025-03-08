import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Contents from "../components/blogContents";

function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const userResponse = await axios.get("http://localhost:4000/info/email", config);
        const postsResponse = await axios.get("http://localhost:4000/posts/user/posts", config);


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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setImageLoading(true);
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post("http://localhost:4000/user/upload-avatar", formData, config);
      
      setUser((prevUser) => ({
        ...prevUser,
        avatar: response.data.avatarUrl,
      }));
      
      setSelectedImage(null);
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
      <div style={{ textAlign: "center", padding: "20px" }}>
        <div style={{ marginBottom: "20px", display: "inline-block", position: "relative" }}>
          <img
            src={selectedImage || user.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              border: "3px solid #ddd",
              objectFit: "cover",
            }}
          />
          <label
            htmlFor="file-input"
            style={{
              cursor: "pointer",
              position: "absolute",
              bottom: "5px",
              right: "5px",
              color: "white",
              backgroundColor: "#333",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            📷
          </label>
        </div>

        <input type="file" accept="image/*" id="file-input" onChange={handleFileChange} style={{ display: "none" }} />

        {selectedImage && (
          <div style={{ marginTop: "10px" }}>
            <button className="upload-button"

              onClick={handleImageUpload}
              
            >
              Upload Profile Picture
            </button>
          </div>
        )}

        {imageLoading && <p>Uploading...</p>}

        <h2>{user.name}</h2>
        <p>{user.username}</p>
        <p>{user.bio}</p>
      </div>

      <div className="home-content" style={{ padding: "20px" }}>
        <h3>My Blogs</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-container" style={{ marginBottom: "20px" }}>
              <Contents contents={post} />
              <div className="button-container" style={{ marginTop: "10px" }}>
                <button className="like-button" style={{ marginRight: "10px" }}>
                  Like ({post.likes})
                </button>
                <button className="report-button">Report</button>
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
