const jwt = require('jsonwebtoken')
const logger = require('./logger')

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

const tokenExtractor = (request, response, next) => {
    try {
        if (request.method === 'GET') {

            next()

        } else if (request.url === '/api/login' || request.url === '/api/users') {

            next()

        } else {

            const authorizationContent = request.get('authorization')

            if (!thereIsAuthorizationData(authorizationContent))
                return response.status(401).json({ error: 'header authorization missing or invalid' })

            const token = authorizationContent.substring(7)

            if (!thereIsToken(token))
                return response.status(401).json({ error: 'token missing or invalid' })

            SHOW_LOGS && logger.info('tokenExtractor -> token:', token)

            const decodedToken = jwt.verify(token, process.env.SIGN_TOKEN_SECRET)

            SHOW_LOGS && logger.info('tokenExtractor -> decodedToken OK')

            if (!thereIsTokenId(decodedToken))
                return response.status(401).json({ error: 'token invalid' })

            request.token = token

            next()
        }
    } catch (e) {

        SHOW_LOGS && logger.info('tokenExtractor -> decodedToken FAIL')

        next(e)

    }
}

module.exports = tokenExtractor