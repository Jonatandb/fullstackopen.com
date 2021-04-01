import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, error, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('bookstore-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async event => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      {error && <h3>{error}</h3>}
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Username <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
