import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (!user) {
      const savedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
      if (savedUser) {
        blogService.setToken(savedUser.token)
        setUser(savedUser)
      }
    }
  }, [])

  useEffect(() => {
    if (user) {
      getBlogs()
    }
  }, [user])

  const getBlogs = () => blogService.getAll().then(blogs => setBlogs(blogs))

  const handleLogin = async e => {
    try {

      e.preventDefault()
      const result = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(result))
      blogService.setToken(result.token)
      setUser(result)

    } catch (e) {
      console.log('handleLogin() -> error:', e)
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

      clearForm()
      getBlogs()

    } catch (error) {
      console.log('handleCreateBlog() -> error:', error)
    }
  }

  const createBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
      <h2>create blog</h2>
      <div><label htmlFor="title">title</label><input id='title' onChange={({ target }) => setTitle(target.value)}></input></div>
      <div><label htmlFor="author">author</label><input id='author' onChange={({ target }) => setAuthor(target.value)}></input></div>
      <div><label htmlFor="url">url</label><input id='url' onChange={({ target }) => setUrl(target.value)}></input></div>
      <button>create</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='username'>username: </label>
            <input type='text' id='username' onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <label htmlFor='password'>password: </label>
            <input type='password' id='password' onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {createBlogForm()}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
