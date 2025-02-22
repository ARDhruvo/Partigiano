import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import BlogContents from "./blogContents";
import { useParams } from "react-router-dom";
import "./home.css";

function categoryBody() {
  const { category } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/posts/${category}`); //${category}
        setBlogs(response.data);
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
        Category : {category}
        <hr />
      </div>
      
      <BlogContents
        blogs={blogs}
      />
      
    </div>
  );
}

export default categoryBody;
