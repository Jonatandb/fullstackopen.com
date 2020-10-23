const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
})

describe('addition of a new user', () => {

    test('new valid user creation returns status code 200', async () => {
        const newUser = {
            name: 'Jonatandb',
            username: 'Jonatandb',
            password: '123'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(200)
    })

    test('invalid user creation without username returns status code 400 and correct error message', async () => {
        const newUser = {
            name: 'Jonatandb',
            username: '',
            password: '123'
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(JSON.parse(response.error.text).error).toBe("username must be at least 3 characters long")
    })

    test('invalid user creation without password returns status code 400 and correct error message', async () => {
        const newUser = {
            name: 'Jonatandb',
            username: 'Jonatandb',
            password: ''
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(JSON.parse(response.error.text).error).toBe("password must be at least 3 characters long")
    })

    test('invalid user creation with non-unique username returns status code 400 and correct error message', async () => {
        const newUser = {
            name: 'Jonatandb',
            username: 'Jonatandb',
            password: '123'
        }
        const response = await api.post('/api/users').send(newUser)
        const newResponse = await api.post('/api/users').send(newUser)
        expect(newResponse.status).toBe(400)
        expect(JSON.parse(newResponse.error.text).error).toContain("expected `username` to be unique")
    })
})

afterAll(() => {
    mongoose.connection.close()
})