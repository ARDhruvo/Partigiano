import React from 'react'
import { Link } from 'react-router-dom';

function adminContents(props) {
  const blogs = props.blogs;
  return (
    <div className="blog-contents">
      {blogs.map((blog) => (
        console.log(blog._id),
        <Link to={`/admin/blog/${blog._id}`}>
          <div className="category-preview" key={blog._id}>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
        </div>
        </Link>
      ))}
    </div>
  );
}

export default adminContents;
