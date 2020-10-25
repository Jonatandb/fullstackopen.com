import React, { useState } from 'react'
import NotificationMessage from './NotificationMessage'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [notification, setNotification] = useState(null)

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
      }, 5000)

    }
  }

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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default LoginForm