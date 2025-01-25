import React from 'react'
import { Link } from 'react-router-dom';

function blogContents(props) {
  const blogs = props.blogs;
  return (
    <div className="blog-contents">
      {blogs.map((blog) => (
        <div className="category-preview" key={blog.id}>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
        </div>
      ))}
    </div>
  );
}

export default blogContents;
