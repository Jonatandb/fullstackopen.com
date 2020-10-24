const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        const user = await User.findById(decodedToken.id)

        const newBlog = new Blog({
            "title": request.body.title,
            "author": request.body.author,
            "url": request.body.url,
            "likes": request.body.likes,
            "user": user._id
        })

        const blogSaved = await newBlog.save()

        user.blogs = user.blogs.concat(blogSaved._id)
        await user.save()

        response.status(201).json(blogSaved)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        const loggedUser = await User.findById(decodedToken.id)

        const { id } = request.params
        const blog = await Blog.findById(id)

        if (!blog) {
            response.status(404).json({ error: 'blog not found' })
        }

        if (loggedUser.id.toString() === blog.user.toString()) {
            await Blog.findByIdAndDelete(blog.id)
            response.status(204).end()
        } else {
            response.status(401).json({
                error: 'blogs can be deleted only by their owners'
            })
        }
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