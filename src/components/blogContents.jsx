import React from 'react'
import { Link } from 'react-router-dom';

function blogContents(props) {
    const blogs=props.blogs;
  return (
    <div className='blog-contents'>
        {blogs.map((blog) => (
            <div className='blog-preview' key={blog.id}>
              
                <Link to={`/blog/${blog.id}`}>
                  <h2>{ blog.title }</h2>
                  <p>Written by {blog.author} </p>
                </Link>
              
            </div>
        ))}
    </div>
  )
}

export default blogContents;