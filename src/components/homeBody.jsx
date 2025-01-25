import React, { useState } from "react";
import CategoryContents from "./categoryContents";

function homeBody() {
  const [categories, setCategory] = useState([
    {
      title: "Education",
      body: "Post anything related to your study",
      id: "Education",
    },
    { title: "Emergency", body: "Post anything urgent", id: "Emergency" },
    {
      title: "Education2",
      body: "Post anything related to your study",
      id: "Education2",
    },
  ]);

  return (
    <div className="home-content">
      <div className="homeTitle">
        <h3>Categories</h3>
      </div>

      <CategoryContents categories={categories} />
    </div>
  );
}

export default homeBody;
