import React, { useState, useEffect } from "react";
import Header from "../components/header";
import BlogBody from "../components/blogBody";
import Comment from "../components/comment";

function Blog() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Header />
      <BlogBody />
      {isLoggedIn ? (
        <>
          <Comment />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Blog;
