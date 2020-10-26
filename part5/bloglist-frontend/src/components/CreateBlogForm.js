import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ createBlog, setNotification }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = evt => {
    evt.preventDefault()

    if (!title || title.trim().length === 0) {
      setNotification({ message: 'Error: Title required', error: true })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      return
    }

    if (!url || url.trim().length === 0) {
      setNotification({ message: 'Error: URL required', error: true })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      return
    }

    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return <>
    <form onSubmit={handleCreateBlog} className="formDiv">
      <h2>Create blog</h2>
      <div>
        <label htmlFor="title">Title: </label>
        <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <label htmlFor="author">Author: </label>
        <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        <label htmlFor="url">URL: </label>
        <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button>Create</button>
    </form>
  </>
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default CreateBlogForm