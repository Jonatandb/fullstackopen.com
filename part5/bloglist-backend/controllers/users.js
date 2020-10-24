const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { user: 0, likes: 0 })
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const usernameMinLength = passwordMinLenght = 3
        const { username } = request.body
        if (!username || username.trim().length < usernameMinLength) {
            return response.status(400).json({
                error: `username must be at least ${usernameMinLength} characters long`
            })
        }
        const { password } = request.body
        if (!password || password.trim().length < passwordMinLenght) {
            return response.status(400).json({
                error: `password must be at least ${passwordMinLenght} characters long`
            })
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const { name } = request.body

        const user = new User({
            name: name ? name.trim() : '',
            username: username.trim(),
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (e) {
        next(e)
    }
})

module.exports = usersRouter