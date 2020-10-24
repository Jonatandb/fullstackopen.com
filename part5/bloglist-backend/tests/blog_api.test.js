const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)

const User = require('../models/user')

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

let token = ''

beforeEach(async () => {
    await User.deleteMany({})

    // tmp user creation
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('123', saltRounds)
    const tempUser = await User.create({
        name: 'tempUser',
        username: 'tempUser',
        passwordHash
    })

    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    blogObject.user = tempUser.id
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    blogObject.user = tempUser.id
    await blogObject.save()

    // login
    const loginResponse = await api
        .post('/api/login')
        .send({ username: 'tempUser', password: '123' })

    // getting token
    token = loginResponse.body.token
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

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('authorization', `bearer ${token}`)

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

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('authorization', `bearer ${token}`)

        expect(response.body.likes).toBeDefined()
        const blogExistsInDB = await Blog.findById(response.body.id)
        expect(blogExistsInDB.likes).toBe(0)
    })

    test('creation attempt of new blog without title and url return bad request status (400)', async () => {
        const newBlog = {
            author: "Jonatandb",
            likes: 1400
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('authorization', `bearer ${token}`)
        expect(response.status).toBe(400)
    })

    test('creation attempt fails with status code 401 Unauthorized if a token is not provided', async () => {
        const newBlog = {
            title: "Full Stack Open 2020",
            author: "Jonatandb",
            likes: 1400
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
        expect(response.status).toBe(401)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await api
            .get('/api/blogs')

        const blogToDelete = blogsAtStart.body[0]

        const response = await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('authorization', `bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await api.get('/api/blogs')

        expect(blogsAtEnd.body).toHaveLength(
            blogsAtStart.body.length - 1
        )

        const titles = blogsAtEnd.body.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })

    test('error with status code 404 if blog id is invalid or inexistent', async () => {
        const blogsAtStart = await api
            .get('/api/blogs')

        const nonexistentBlog = new Blog({
            title: "Full Stack Open 2020 v2.5",
            author: "Jonatandb",
            url: "github.com/Jonatandb",
            likes: 1500
        })

        const response = await api
            .delete(`/api/blogs/${nonexistentBlog.id}`)
            .set('authorization', `bearer ${token}`)
            .expect(404)

        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(
            blogsAtStart.body.length
        )
    })

    test('deletion attempt fails with status code 401 Unauthorized if a token is not provided', async () => {
        const blogsAtStart = await api
            .get('/api/blogs')

        const blogToDelete = blogsAtStart.body[0]

        const response = await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)
    })
})

describe('updation of a blog', () => {
    test('succeeds updating with status code 204 if id is valid', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToUpdate = blogsAtStart.body[0]
        const updatedLikesAmount = {
            likes: 513518
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedLikesAmount)
            .set('authorization', `bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await api.get('/api/blogs')
        const blogUpdated = blogsAtEnd.body[0]

        expect(blogUpdated.likes).toBe(updatedLikesAmount.likes)
    })

    test('updation attempt fails with status code 401 Unauthorized if a token is not provided', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToUpdate = blogsAtStart.body[0]
        const updatedLikesAmount = {
            likes: 513518
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedLikesAmount)
            .expect(401)
    })
})

afterAll(() => {
    mongoose.connection.close()
})