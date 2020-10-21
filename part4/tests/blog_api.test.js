const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: "Full Stack Open 2020",
        author: "Jonatandb",
        url: "github.com/Jonatandb",
        likes: 100
    },
    {
        title: "Full Stack Open 2020 v2",
        author: "Jonatandb",
        url: "github.com/Jonatandb",
        likes: 1500
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.status).toBe(200)
    expect(response.get("Content-Type").split(';')[0]).toBe('application/json')
    expect(response.body).toHaveLength(2)
})

test('blogs have the unique identifier property id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[1].id).toBeDefined()
})

test('new blog is created correctly', async () => {
    const newBlog = {
        title: "Full Stack Open 2020",
        author: "Jonatandb",
        url: "github.com/Jonatandb",
        likes: 1005
    }

    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(201)
    expect(response.body.author).toBeDefined()
    expect(response.body.likes).toBeDefined()
    expect(response.body.title).toBeDefined()
    expect(response.body.url).toBeDefined()
    expect(response.body.id).toBeDefined()

    const blogExistsInDB = await Blog.findById(response.body.id)
    expect(blogExistsInDB).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})