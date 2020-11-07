
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_AUTHOR_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const authorsResponse = useQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState([])
  const [birthyear, setBirthyear] = useState('')
  const [setAuthorBirthyear] = useMutation(SET_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('OH! Ohhh:', JSON.stringify(error))
    }
  })

  const [selectedAuthor, setSelectedAuthor] = useState()

  useEffect(() => {
    if (authorsResponse.loading) {
      return undefined
    } else {
      if (authorsResponse.data.allAuthors.length > 0) {
        setAuthors(authorsResponse.data.allAuthors)
        setSelectedAuthor(authorsResponse.data.allAuthors[0])
        setBirthyear(authorsResponse.data.allAuthors[0].born)
      } else {
        return undefined
      }
    }
  }, [authorsResponse])

  if (!props.show) {
    return null
  }

  if (authorsResponse.loading) return null

  const Submit = async (event) => {
    event.preventDefault()
    setAuthorBirthyear({ variables: { name: selectedAuthor.name, setBornTo: Number(birthyear) } })
    setBirthyear('')
  }

  const SelectAuthor = event => {
    const selectedAuthor = authors.find(author => author.id === event.target.value)
    if(selectedAuthor) {
      setSelectedAuthor(selectedAuthor)
      setBirthyear(selectedAuthor.born ? selectedAuthor.born : '')
    }
  }

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
        <form onSubmit={Submit}>
          <select value={selectedAuthor && selectedAuthor.id} onChange={SelectAuthor}>
            {authors.map(au => <option key={au.id} value={au.id} >{au.name}</option>)}
          </select>
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
