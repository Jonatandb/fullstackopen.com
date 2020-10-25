import React, { useState } from 'react'

const CreateBlogForm = ({ handleSubmit }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = evt => {
        evt.preventDefault()

        handleSubmit({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return <>
        <form onSubmit={handleCreateBlog}>
            <h2>Create blog</h2>
            <div>
                <label htmlFor="title">Title: </label>
                <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
                <label htmlFor="author">Author: </label>
                <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
                <label htmlFor="url">URL: </label>
                <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button>Create</button>
        </form>
    </>
}

export default CreateBlogForm