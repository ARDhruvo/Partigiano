import React from 'react'
import Header from '../components/header'
import BlogBody from '../components/blogBody'
import Comment from '../components/comment'
function blog() {
  return (
    <div>
        <Header/>
        <BlogBody/>
        <Comment/>
    </div>
  )
}

export default blog