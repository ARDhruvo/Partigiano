import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import BlogContents from "./blogContents";
import AdminContents from "./adminContents";
import { useParams } from "react-router-dom";
import "./home.css";

function adminBody() {
  const { category } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/posts`); //${category}
        const reportedBlogs = response.data
        .filter((blog) => blog.reports > 0) // Keep only reported blogs
        .sort((a, b) => b.reports - a.reports);
        setBlogs(reportedBlogs);
      } catch (error) {
        console.error("Error fetching category blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBlogs();
  }, [category]);


  return (
    <div className="home-content">
      <div className="homeTitle">
        Reported Posts:
        <hr />
      </div>
      
      <AdminContents
        blogs={blogs}
      />
      
    </div>
  );
}

export default adminBody;
