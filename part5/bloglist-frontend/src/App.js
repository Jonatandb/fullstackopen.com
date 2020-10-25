import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NotificationMessage from './components/NotificationMessage'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const savedUserData = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (savedUserData) {
      blogService.setToken(savedUserData)
      setUser(savedUserData)
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

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateBlog = async ({
    title,
    author,
    url
  }) => {
    try {

      blogFormRef.current.toggleVisibility()

      const result = await blogService.create(title, author, url)

      if (result.status !== 201) {
        throw result
      }

      setNotification({ message: `A new blog ${title} by ${author} added` })
      setTimeout(() => {
        setNotification(null)
      }, 5000);


      getBlogs()

    } catch (error) {

      const errorMessage = error.response ? error.response.data.error : error.message
      setNotification({ message: errorMessage, error: true })
      setTimeout(() => {
        setNotification(null)
      }, 5000);

    }
  }

  return user === null ?
    <LoginForm setUser={setUser} />
    :
    <div>
      <h2>Blogs</h2>
      <NotificationMessage message={notification} />
      <p>{user.username} logged in <button onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <CreateBlogForm handleSubmit={handleCreateBlog} />
      </Togglable>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>

}

export default App
