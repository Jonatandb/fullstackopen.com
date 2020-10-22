const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const newBlog = new Blog(request.body)
        const blogSaved = await newBlog.save()
        response.status(201).json(blogSaved)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const { id } = request.params
        const result = await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (e) {
        next(e)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const { id } = request.params
        const { likes } = request.body
        const updatedDataBlog = {
            likes
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, updatedDataBlog, { new: true })
        response.status(204).json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter