import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Contents from "../components/blogContents";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch User Info First
  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    if (!storedEmail) {
      navigate("/login");
      return;
    }
    setUserEmail(storedEmail);

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/info/${storedEmail}`);
        setUserId(response.data._id);
        setUserName(response.data.username);
        setUser(response.data); // Store user data
      } catch (error) {
        console.error("Error fetching user info:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // ✅ Fetch Blogs Only After `userName` Is Set
  useEffect(() => {
    if (!userName) return;

    const fetchCategoryBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/posts`);
        
        const userBlogs = response.data.filter((blog) => blog.author === userName);
        
        setPosts(userBlogs);
        console.log("Fetched blogs:", userBlogs);
      } catch (error) {
        console.error("Error fetching category blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBlogs();
  }, [userName]); // ✅ Depend on userName

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
            src={selectedImage || user?.avatar || "https://via.placeholder.com/150"}
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
            <button className="upload-button" onClick={handleImageUpload}>
              Upload Profile Picture
            </button>
          </div>
        )}

        {imageLoading && <p>Uploading...</p>}

        
        <p>{user?.username || "No Username"}</p>
        
      </div>

      <div className="home-content" style={{ padding: "20px" }}>
        <h3>My Blogs</h3>
        {posts.length > 0 ? (
          <div className="post-container" style={{ marginBottom: "20px" }}>
            <Contents blogs={posts} />

            <div className="button-container" style={{ marginTop: "10px" }}>
              <button className="like-button" style={{ marginRight: "10px" }}>
                Like ({posts.likes || 0})
              </button>
              <button className="report-button">Report</button>
            </div>
          </div>
        ) : (
          <p>No blogs posted yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
