import React from 'react'
import Button from './button'
import { Link } from 'react-router-dom'


function header() {
    

  return (
    <div className='header'>
        <div className='header-logo'>
            <Link to="/">Partigiano</Link>
        </div>
        <div className='headerbtn'>
            <Link to="/category">Add</Link>
            <Link to="/login">Login</Link>
            <Link to="/login">Sign Up</Link>
        </div>
    </div>
  )
}

export default header