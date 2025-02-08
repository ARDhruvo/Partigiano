import React from "react";
import { useState } from "react";
import BlogContents from "./blogContents";
import { useParams } from "react-router-dom";

function categoryBody() {
  const { id } = useParams();

  const [blogs, setBlogs] = useState([
    {
      category: "Education",
      title: "Hello Education",
      body: "Lorem ipsen......",
      author: "Nazim",
      id: 1,
      likes:2,
    },
    {
      category: "Emergency",
      title: "Hello Emergency1",
      body: "Lorem ipsen......",
      author: "Raian",
      id: 2,
      likes:2,
    },
    {
      category: "Emergency",
      title: "Hello Emergency2",
      body: "Lorem ipsen......",
      author: "NRK",
      id: 4,
      likes:4,
    },
    {
      category: "Education2",
      title: "Hello Education1",
      body: "Lorem ipsen......",
      author: "Khan",
      id: 3,
      likes:2,
    },
  ]);

  return (
    <div className="home-content">
      <div className="homeTitle">
        Category : {id}
        <hr />
      </div>
      <BlogContents blogs={blogs.filter((blog) => blog.category === id).sort((a,b) => b.likes - a.likes)} />
    </div>
  );
}

export default categoryBody;
