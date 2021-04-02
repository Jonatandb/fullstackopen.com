import React from 'react'
import { useQuery } from '@apollo/client'
import { RECOMMENDATIONS } from '../queries'

const Recommendations = props => {
  const recommendations = useQuery(RECOMMENDATIONS)

  if (!props.show) {
    return null
  }

  if (recommendations.loading) return null

  const books = recommendations.data.recommendations

  return (
    <div>
      <h2>Recommendations</h2>
      <span>
        Books in your favorite genre <strong>patterns</strong>
      </span>
      <hr />
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
