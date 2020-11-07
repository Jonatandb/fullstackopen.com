
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_AUTHOR_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const allAuthors = useQuery(ALL_AUTHORS)
  const [author, setAuhtor] = useState('')
  const [birthyear, setBirthyear] = useState('')
  const [setAuthorBirthyear] = useMutation(SET_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('OH! Ohhh:', JSON.stringify(error))
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    setAuthorBirthyear({ variables: { name: author, setBornTo: Number(birthyear) } })
    setAuhtor('')
    setBirthyear('')
  }

  if (!props.show) {
    return null
  }

  if (allAuthors.loading) return null

  const authors = allAuthors.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            name
          <input
              value={author}
              onChange={({ target }) => setAuhtor(target.value)}
            />
          </div>
          <div>
            born
          <input
              type='number'
              value={birthyear}
              onChange={({ target }) => setBirthyear(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
