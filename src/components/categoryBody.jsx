import React from 'react'
import { useState } from 'react';

function categoryBody() {

  const [blogs,setBlogs] = useState([
      { title: 'Hello World', body: 'Lorem ipsen......', author:'Nazim' , id: 1},
      { title: 'Hello World', body: 'Lorem ipsen......', author:'Raian' , id: 2},
      { title: 'Hello World', body: 'Lorem ipsen......', author:'Khan' , id: 3},
    ]); 
    
  return (
    <div className='category-content'>
        {blogs.map((blog) => (
            <div className='blog-preview' key={blog.id}>
                <h2>{ blog.title }</h2>
                <p>Written by {blog.author}</p>
            </div>
        ))}
    </div>
  )
}

export default categoryBody