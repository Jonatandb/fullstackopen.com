import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [user])

  const handleSubmit = async e => {
    e.preventDefault()
    const result = await loginService.login({ username, password })
    setUser(result)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
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
      <p>{user.name} logged in</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
