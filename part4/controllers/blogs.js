const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const blog = new Blog(request.body)
        const blogSaved = await blog.save()
        response.status(201).json(blogSaved)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const id = request.params.id
        const result = await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (e) {
        next(e)
    }
})

module.exports = blogsRouter