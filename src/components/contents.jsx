import React from 'react'

function contents(props) {

    const blogs = props.blogs;

  return (
    <div className='contents'>
        {blogs.map((blog) => (
            <div className='category-preview' key={blog.id}>
                <h2>{ blog.title }</h2>
                <p>Written by {blog.author}</p>
            </div>
        ))}
    </div>
  )
}

export default contents