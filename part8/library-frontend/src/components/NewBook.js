import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = props => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: error => {
      console.log('OH! Ohhh:', JSON.stringify(error))
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [...dataInStore.allBooks, response.data.addBook],
        },
      })
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()

    addBook({
      variables: {
        title,
        published: Number(published),
        author,
        genres,
      },
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author
          <input value={author} onChange={({ target }) => setAuhtor(target.value)} />
        </div>
        <div>
          Published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type='button'>
            Add genre
          </button>
        </div>
        <div>Genres: {genres.join(' ')}</div>
        <button type='submit'>Create book</button>
      </form>
    </div>
  )
}

export default NewBook
