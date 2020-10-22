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

describe('when there is initially some blogs saved', () => {
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
})

describe('addition of a new blog', () => {
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

    test('new blog with missing "likes" property, is created with default value "0"', async () => {
        const newBlog = {
            title: "Full Stack Open 2020",
            author: "Jonatandb",
            url: "github.com/Jonatandb"
        }

        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.body.likes).toBeDefined()
        const blogExistsInDB = await Blog.findById(response.body.id)
        expect(blogExistsInDB.likes).toBe(0)
    })

    test('creation attempt of new blog without title and url return bad request status (400)', async () => {
        const newBlog = {
            author: "Jonatandb",
            likes: 1400
        }

        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.status).toBe(400)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToDelete = blogsAtStart.body[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await api.get('/api/blogs')

        expect(blogsAtEnd.body).toHaveLength(
            blogsAtStart.body.length - 1
        )

        const titles = blogsAtEnd.body.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})