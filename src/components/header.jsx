"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // change to accessToken later
    const refreshToken = localStorage.getItem("refreshToken"); // change to accessToken later

    if (accessToken) {
      setIsLoggedIn(true);
    }
    // Check for the presence of an access token in cookies
    // const checkAuthStatus = () => {
    //   const cookies = document.cookie.split(";");
    //   const accessTokenCookie = cookies.find((cookie) =>
    //     cookie.trim().startsWith("accessToken=")
    //   );
    //   setIsLoggedIn(!!accessTokenCookie);
    // };

    // checkAuthStatus();
    // // You might want to set up an interval to periodically check the auth status
    // const interval = setInterval(checkAuthStatus, 60000); // Check every minute

    // return () => clearInterval(interval);
  });

  const handleLogout = async () => {
    localStorage.clear();
    setIsLoggedIn(false);

    navigate("/");

    // try {
    //   const response = await fetch("http://localhost:4000/login/auth/logout", {
    //     method: "POST",
    //     credentials: "include", // This is important to include cookies in the request
    //   });

    //   if (response.ok) {
    //     setIsLoggedIn(false);
    //     navigate("/login");
    //   } else {
    //     console.error("Logout failed");
    //   }
    // } catch (error) {
    //   console.error("Logout error:", error);
    // }
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <h3>PARTIGIANO</h3>
        </Link>
      </div>
      <div className="headerbtn">
        {isLoggedIn ? (
          <>
            <Link to="/create">
              <button>Add Post</button>
            </Link>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
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
