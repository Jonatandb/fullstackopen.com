import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [open, setOpen] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)
  const [sendingUpdate, setSendingUpdate] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    setSendingUpdate(true)
    const updatedBlog = await blogService.update(currentBlog)
    setCurrentBlog(updatedBlog.data)
    setSendingUpdate(false)
  }

  return (
    <div style={blogStyle}>
      {currentBlog.title} <button onClick={() => setOpen(!open)}>{open ? 'Hide' : 'View'}</button><br />
      {
        open && <>
          {currentBlog.url}<br />
          likes {currentBlog.likes} <button onClick={() => handleLike()} disabled={sendingUpdate} >Like</button><br />
          {currentBlog.author}<br />
        </>
      }
    </div >
  )
}

export default Blog
