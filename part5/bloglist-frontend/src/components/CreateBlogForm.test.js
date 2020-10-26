import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm /> ', () => {

  let createBlog
  let setNotification
  let component
  let titleInput
  let authorInput
  let urlInput
  let form

  beforeEach(() => {
    createBlog = jest.fn()
    setNotification = jest.fn()

    component = render(
      <CreateBlogForm createBlog={createBlog} setNotification={setNotification}/>
    )

    titleInput = component.container.querySelector('#title')
    authorInput = component.container.querySelector('#author')
    urlInput = component.container.querySelector('#url')
    form = component.container.querySelector('form')

  })

  test('calls setNotification when the title is missing', () => {

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(0)
    expect(setNotification.mock.calls).toHaveLength(1)
    expect(setNotification.mock.calls[0][0].message).toBe('Error: Title required')

  })

  test('calls setNotification when the url is missing', () => {

    fireEvent.change(titleInput, {
      target: { value: 'testing of forms could be easier' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(0)
    expect(setNotification.mock.calls).toHaveLength(1)
    expect(setNotification.mock.calls[0][0].message).toBe('Error: URL required')

  })

  test('form calls the createBlog event handler it received as props with the right details when a new blog is created', () => {

    fireEvent.change(titleInput, {
      target: { value: 'Testing of forms could be easier' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'Jonatandb' }
    })

    fireEvent.change(urlInput, {
      target: { value: 'www.google.com' }
    })

    fireEvent.submit(form)

    expect(setNotification.mock.calls).toHaveLength(0)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing of forms could be easier')
    expect(createBlog.mock.calls[0][0].author).toBe('Jonatandb')
    expect(createBlog.mock.calls[0][0].url).toBe('www.google.com')

  })

})