import React from 'react'
import Button from './button'


function header() {
    

  return (
    <div className='header'>
        <div className='header-logo'>
            <a href="#">Partigiano</a>
        </div>
        <div className='headerbtn'>
            <a href="category.jsx">Add</a>
            <a href="">Login</a>
            <a href="">Sign Up</a>
        </div>
    </div>
  )
}

export default header