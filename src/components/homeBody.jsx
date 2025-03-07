import React, { useState } from "react";
import CategoryContents from "./categoryContents";
import "./home.css";

function homeBody() {
  const [categories, setCategory] = useState([
    {
      title: "Technology",
      body: "Post anything related to tech",
      id: "Technology",
    },
    { title: "Emergency", body: "Post anything urgent", id: "Emergency" },
    {
      title: "Health",
      body: "Post anything related to health",
      id: "Health",
    },
    {
      title: "Education",
      body: "Post anything related to your studies",
      id: "Education",
    },
    {
      title: "Others",
      body: "Post anything related to other stuffs",
      id: "Others",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on search input
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-content">
      <div className="homeTitle">
        Categories
        <hr />
      </div>
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <CategoryContents categories={filteredCategories} />
    </div>
  );
}

export default homeBody;
