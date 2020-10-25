const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    try {

        const blogs = await Blog.find({}).populate('user', { blogs: 0 })
        return response.json(blogs)

    } catch (error) {

        next(error)

    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {

        const decodedToken = jwt.verify(request.token, process.env.SIGN_TOKEN_SECRET)

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

        return response.status(201).json(blogSaved)

    } catch (error) {

        next(error)

    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {

        const decodedToken = jwt.verify(request.token, process.env.SIGN_TOKEN_SECRET)

        const loggedUser = await User.findById(decodedToken.id)

        if (!loggedUser) {
            return response.status(401).json({
                error: `Logged user do not longer exists`
            })
        }

        const { id } = request.params

        if (!id) {
            return response.status(404).json({ error: 'Blog id missing or invalid' })
        }

        const blog = await Blog.findById(id)

        if (!blog) {
            return response.status(404).json({ error: 'Blog not found' })
        }

        if (!blog.user || loggedUser.id.toString() === blog.user.toString()) {
            await Blog.findByIdAndDelete(blog.id)
            return response.status(204).end()
        } else {
            return response.status(401).json({
                error: 'Blogs can be deleted only by their owners'
            })
        }

    } catch (error) {

        next(error)

    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {

        const decodedToken = jwt.verify(request.token, process.env.SIGN_TOKEN_SECRET)

        const loggedUser = await User.findById(decodedToken.id)

        if (!loggedUser) {
            return response.status(401).json({
                error: `Logged user do not longer exists`
            })
        }

        const { id } = request.params

        if (!id) {
            return response.status(404).json({ error: 'Blog id missing or invalid' })
        }

        const { likes, user, author, title, url } = request.body

        if (!likes) {
            return response.status(400).json({ error: 'Blog likes amount missing or invalid' })
        }
        else if (typeof (likes + 1) !== 'number') {
            return response.status(400).json({ error: 'Blog likes amount missing or invalid' })
        }

        const updatedDataBlog = {
            likes,
            user,
            author,
            title,
            url
        }

        await Blog.findByIdAndUpdate(id, updatedDataBlog)
        return response.status(204).end()

    } catch (error) {

        next(error)

    }
})

module.exports = blogsRouter