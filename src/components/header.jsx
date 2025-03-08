"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // change to accessToken later
    const refreshToken = localStorage.getItem("refreshToken"); // change to accessToken later

    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    }

    const fetchUserData = async () => {
      const email = localStorage.getItem("verificationEmail");

      if (!email) {
        // If no email is found, the user is not logged in
        setIsLoggedIn(false);
        return;
      }

      try {
        // Fetch user data by email
        const response = await fetch(`http://localhost:4000/info/${email}`);
        const data = await response.json();

        if (response.ok) {
          // Check the user's accStatus
          if (data.accStatus === "admin") {
            console.log("Admin user detected");
            setIsAdmin(true);
          } else {
            console.log("Regular user detected");
          }
        } else {
          // Handle errors (e.g., user not found)
          console.error("Failed to fetch user data:", data.message);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Link to={isAdmin ? "/admin" : "/"}>
          <h3>PARTIGIANO</h3>
        </Link>
      </div>
      <div className="headerbtn">
        {isLoggedIn ? (
          <>
            <Link to="/create">
              <button>Add Post</button>
            </Link>
            {/* Conditionally render the Link based on isAdmin */}
            {isAdmin ? (
              <Link to="/admin">
                <button>Profile</button>
              </Link>
            ) : (
              <Link to="/">
                <button>Profile</button>
              </Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
