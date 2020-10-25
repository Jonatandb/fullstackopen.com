import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedUser, updateLike, removeBlog }) => {
  const [showDetails, setshowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonVisibilityStyle = { display: blog.user.username === loggedUser ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setshowDetails(!showDetails)}>{showDetails ? 'Hide' : 'View'}</button><br />
      {
        showDetails && <>
          {blog.url}<br />
          likes {blog.likes} <button onClick={() => updateLike(blog)}>Like</button><br />
          {blog.author}<br />
          <button onClick={() => removeBlog(blog)} style={removeButtonVisibilityStyle}>Remove</button>
        </>
      }
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.string.isRequired,
  updateLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
