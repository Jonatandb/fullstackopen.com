import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> ', () => {

  const blog = {
    title: 'test blog',
    author:'Jonatandb',
    url:'www.google.com',
    likes:1000,
    user: {
      username: 'Jonatandb'
    }
  }

  const loggedUser = 'Jonatandb'
  let component
  let updateLike
  let removeBlog
  let blogData

  beforeEach(() => {
    updateLike = jest.fn()
    removeBlog = jest.fn()

    component = render(
      <Blog  blog={blog} loggedUser={loggedUser} updateLike={updateLike} removeBlog={removeBlog} />
    )

    blogData = component.container.querySelector('.blogData')

  })

  test('blog renders title, but does not render its url, author or number of likes by default', () => {
    expect(blogData).toHaveTextContent(blog.title)
    expect(blogData).not.toHaveTextContent(blog.url)
    expect(blogData).not.toHaveTextContent(blog.author)
    expect(blogData).not.toHaveTextContent(blog.likes)
  })

})