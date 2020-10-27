const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const SHOW_LOGS = false

const thereIsAuthorizationData = authorization => {
    SHOW_LOGS && logger.info('thereIsAuthorizationData -> authorization:', authorization)
    const result = authorization && authorization.toLowerCase().startsWith('bearer ')
    SHOW_LOGS && logger.info('thereIsAuthorizationData -> result:', result)
    return result
}

const thereIsToken = token => {
    SHOW_LOGS && logger.info('thereIsToken -> token:', token)
    const result = token && (token.trim().length > 0)
    SHOW_LOGS && logger.info('thereIsToken -> result:', result)
    return result
}

const thereIsTokenId = token => {
    SHOW_LOGS && logger.info('thereIsTokenId -> token:', token)
    const result = token && (typeof token.id !== 'undefined')
    SHOW_LOGS && logger.info('thereIsTokenId -> result:', result)
    return result
}

const userIsValid = async token => {
    SHOW_LOGS && logger.info('userIsValid -> token:', token)
    const user = await User.findById(token.id)
    result = user !== null
    SHOW_LOGS && logger.info('userIsValid -> result:', result)
    return result
}

const tokenExtractor = async  (request, response, next) => {
    try {

        if (request.method === 'GET') {

            next()

        } else if (request.url === '/api/login' || request.url === '/api/users' || request.url === '/api/testing/reset') {

            next()

        } else {

            const authorizationContent = request.get('authorization')

            if (!thereIsAuthorizationData(authorizationContent))
                return response.status(401).json({ error: 'Header authorization missing or invalid.' })

            const token = authorizationContent.substring(7)

            if (!thereIsToken(token))
                return response.status(401).json({ error: 'Token missing or invalid.' })

            SHOW_LOGS && logger.info('tokenExtractor -> token:', token)

            const decodedToken = jwt.verify(token, process.env.SIGN_TOKEN_SECRET)

            SHOW_LOGS && logger.info('tokenExtractor -> decodedToken OK')

            if (!thereIsTokenId(decodedToken))
                return response.status(401).json({ error: 'Invalid token.' })

            const isValidUser = await userIsValid(decodedToken)
            SHOW_LOGS && logger.info('tokenExtractor -> isValidUser:', isValidUser)

            if(!isValidUser)
                return response.status(401).json({ error: 'Logged user invalid or inactive.' })

            request.token = token

            next()
        }

    } catch (e) {

        logger.error('tokenExtractor error:',e)

        next(e)

    }
}

module.exports = tokenExtractor