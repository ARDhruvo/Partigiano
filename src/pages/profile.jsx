import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Contents from "../components/blogContents"; 
import axios from "axios";

function Profile() {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        // Get user data (assuming user info is stored in localStorage)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.username) {
          console.error("No user found in local storage");
          setLoading(false);
          return;
        }

        const username = storedUser.username;

        // Fetch user details
        const userResponse = await axios.get(`http://localhost:4000/user/${username}`);
        setUser(userResponse.data);

        // Fetch user posts
        const postsResponse = await axios.get(`http://localhost:4000/posts/profile/${username}`);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <Header />
      <div style={{ textAlign: "center" }}>
        <img
          src={user.avatar}
          alt="Avatar"
          style={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
        <h2>{user.name}</h2>
        <p>@{user.username}</p>
        <p>{user.bio}</p>
      </div>

      {/* Display User's Blog Posts */}
      <div className="home-content">
        <h3>My Blogs</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-container">
              <Contents contents={post} />
              <div className="button-container" style={{ marginLeft: "40px" }}>
                <button className="like-button">Like ({post.likes})</button>
                <button className="report-button" style={{ marginLeft: "10px" }}>
                  Report
                </button>
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
