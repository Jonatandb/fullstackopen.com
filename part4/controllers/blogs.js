const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        const firstUserFounded = users[0]

        const newBlog = new Blog({
            "title": request.body.title,
            "author": request.body.author,
            "url": request.body.url,
            "likes": request.body.likes,
            "user": firstUserFounded._id
        })

        const blogSaved = await newBlog.save()

        firstUserFounded.blogs = firstUserFounded.blogs.concat(blogSaved._id)
        await firstUserFounded.save()

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