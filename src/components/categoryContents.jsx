import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function categoryContents(props) {
  const categories = props.categories;
  return (
    <div className="category-content">
      {categories.map((category) => (
        <div className="category-preview" key={category.id}>
          <Link to={`/category/${category.id}`}>
            <h2>{category.title}</h2>
            <p>{category.body}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default categoryContents;
