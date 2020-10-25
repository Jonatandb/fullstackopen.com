import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [open, setOpen] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setOpen(!open)}>{open ? 'Hide' : 'View'}</button><br />
      {
        open && <>
          {blog.url}<br />
          likes {blog.likes} <button>Like</button><br />
          {blog.author}<br />
        </>
      }
    </div>
  )
}

export default Blog
