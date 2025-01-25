import React, { useState } from 'react'

function homeBody() {

  const [categories,setCategory] = useState([
    { title: 'Education', body: 'Post anything related to your study' , id: 1},
    { title: 'Education', body: 'Post anything related to your study', id: 2},
    { title: 'Education', body: 'Post anything related to your study', id: 3},
  ]); 

  return (
    <div className='home-content'>
      <div className='homeTitle'>
        <h1>Categories</h1>
      </div>
        {categories.map((category) => (
            <div className='category-preview' key={category.id}>
                <h2>{ category.title }</h2>
                <p>{category.body}</p>
            </div>
        ))}
    </div>
  )
}

export default homeBody