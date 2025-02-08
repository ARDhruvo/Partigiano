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
