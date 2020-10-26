import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'test blog',
  author:'Jonatandb',
  url:'www.google.com',
  likes:1000,
  user: {
    username: 'Jonatandb'
  }
}

describe('<Blog />', () => {

  const loggedUser = 'Jonatandb'
  let component
  let updateLike
  let removeBlog
  let blogData
  let showDetailsButton

  beforeEach(() => {
    updateLike = jest.fn()
    removeBlog = jest.fn()

    component = render(
      <Blog  blog={blog} loggedUser={loggedUser} updateLike={updateLike} removeBlog={removeBlog} />
    )

    blogData = component.container.querySelector('.blogData')

    showDetailsButton = component.getByText('View')

  })

  test('blog renders title, but does not render its url, author or number of likes by default', () => {

    expect(blogData).toHaveTextContent(blog.title)
    expect(blogData).not.toHaveTextContent(blog.url)
    expect(blogData).not.toHaveTextContent(blog.author)
    expect(blogData).not.toHaveTextContent(blog.likes)

  })

  test('blog renders its url, number of likes and author when show details button is clicked', () => {

    fireEvent.click(showDetailsButton)

    const blogDetails = component.container.querySelector('.blogDetails')

    expect(blogDetails).toBeDefined()
    expect(blogData).toHaveTextContent(blog.url)
    expect(blogData).toHaveTextContent(blog.author)
    expect(blogData).toHaveTextContent(blog.likes)

  })

  test('if the Like button is clicked twice, the updateLike event handler is called twice', () => {

    fireEvent.click(showDetailsButton)

    const updateLikeButton = component.getByText('Like')
    fireEvent.click(updateLikeButton)
    fireEvent.click(updateLikeButton)

    expect(updateLike.mock.calls).toHaveLength(2)

  })

  test('if the Remove button is clicked, the removeBlog event handler should be called', () => {

    fireEvent.click(showDetailsButton)

    const removeButton = component.getByText('Remove')

    fireEvent.click(removeButton)

    expect(removeBlog.mock.calls).toHaveLength(1)

  })

})

describe('<Blog /> tested with other user logged', () => {

  test('if the user logged is not the owner of the blog, the Remove button shouldn\'t be showed' , () => {

    const updateLike = jest.fn()
    const removeBlog = jest.fn()

    const component = render(
      <Blog  blog={blog} loggedUser="Admin" updateLike={updateLike} removeBlog={removeBlog} />
    )

    const showDetailsButton = component.getByText('View')

    fireEvent.click(showDetailsButton)

    const removeButton = component.getByText('Remove')

    expect(removeButton).toHaveStyle('display: none')
  })
})