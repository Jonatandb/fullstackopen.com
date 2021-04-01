import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  const allBooks = useQuery(ALL_BOOKS)
  const [genreToFilter, setGenreToFilter] = useState()

  if (!props.show) {
    return null
  }

  if (allBooks.loading) return null

  const books = allBooks.data.allBooks

  const genres = books.reduce((acc, book) => {
    if (book.genres.length) {
      book.genres.forEach(genre => !acc.includes(genre) && acc.push(genre))
    }
    return acc
  }, [])

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books
            .filter(b => !genreToFilter || b.genres.includes(genreToFilter))
            .map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h3>Filter by genre:</h3>
      {genres.map((g, idx) => (
        <button key={idx} onClick={() => setGenreToFilter(g)}>
          {g}
        </button>
      ))}
      {genreToFilter && <button onClick={() => setGenreToFilter('')}>All genres</button>}
    </div>
  )
}

export default Books
