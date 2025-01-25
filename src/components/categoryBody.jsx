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
    },
    {
      category: "Emergency",
      title: "Hello Emergency",
      body: "Lorem ipsen......",
      author: "Raian",
      id: 2,
    },
    {
      category: "Education2",
      title: "Hello Education1",
      body: "Lorem ipsen......",
      author: "Khan",
      id: 3,
    },
  ]);

  return (
    <div className="home-content">
      <div className="homeTitle">
        Category : {id}
        <hr />
      </div>
      <BlogContents blogs={blogs.filter((blog) => blog.category === id)} />
    </div>
  );
}

export default categoryBody;
