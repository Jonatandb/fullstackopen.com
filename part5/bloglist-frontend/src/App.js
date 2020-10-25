import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NotificationMessage from './components/NotificationMessage'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const CreateBlogForm = ({ handleSubmit, title, author, url, handleTitleChange, handleAuthorChange, handleURLChange }) => (
  <form onSubmit={handleSubmit}>
    <h2>Create blog</h2>
    <div><label htmlFor="title">Title: </label><input id='title' value={title} onChange={({ target }) => handleTitleChange(target.value)}></input></div>
    <div><label htmlFor="author">Author:</label><input id='author' value={author} onChange={({ target }) => handleAuthorChange(target.value)}></input></div>
    <div><label htmlFor="url">URL: </label><input id='url' value={url} onChange={({ target }) => handleURLChange(target.value)}></input></div>
    <button>Create</button>
  </form>
)

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    if (!user) {
      const savedUserData = JSON.parse(window.localStorage.getItem('loggedUser'))
      if (savedUserData) {
        blogService.setToken(savedUserData)
        setUser(savedUserData)
      }
    }
  }, [])

  useEffect(() => {
    if (user) {
      getBlogs()
    }
  }, [user])

  const getBlogs = async () => {
    try {

      const response = await blogService.getAll()
      setBlogs(response.data)

    } catch (error) {

      const errorMessage = error.response && error.response.data ? error.response.data.error : error.toString()
      setNotification({ message: errorMessage, error: true })
      setTimeout(() => {
        setNotification(null)
      }, 5000);

    }
  }

  const handleLogin = async evt => {
    try {

      evt.preventDefault()
      const result = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(result.data))
      blogService.setToken(result.data)
      setUser(result.data)

    } catch (error) {

      const errorMessage = error.response ? error.response.data.error : error.message
      setNotification({ message: errorMessage, error: true })
      setTimeout(() => {
        setNotification(null)
      }, 5000);

    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCreateBlog = async (evt) => {
    try {

      evt.preventDefault()

      const result = await blogService.create(title, author, url)

      if (result.status !== 201) {
        throw result
      }

      setNotification({ message: `A new blog ${title} by ${author} added` })
      setTimeout(() => {
        setNotification(null)
      }, 5000);

      blogFormRef.current.toggleVisibility()
      clearForm()
      getBlogs()

    } catch (error) {

      const errorMessage = error.response ? error.response.data.error : error.message
      setNotification({ message: errorMessage, error: true })
      setTimeout(() => {
        setNotification(null)
      }, 5000);

    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <NotificationMessage message={notification} />
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='username'>Username: </label>
            <input type='text' id='username' onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <NotificationMessage message={notification} />
      <p>{user.username} logged in <button onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <CreateBlogForm handleSubmit={handleCreateBlog} title={title} author={author} url={url} handleTitleChange={setTitle} handleAuthorChange={setAuthor} handleURLChange={setUrl} />
      </Togglable>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
